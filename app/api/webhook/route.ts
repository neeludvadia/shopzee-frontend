import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { MetaData } from "@/actions/createCheckoutSession";

export async function POST(req: NextRequest) {
  const body = await req?.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error: "No Signature",
      },
      {
        status: 400,
      }
    );
  }

  const webHookSecret = process.env.STRIPE_WEBHOOK_KEY;
  if (!webHookSecret) {
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not set",
      },
      {
        status: 400,
      }
    );
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webHookSecret);
  } catch (error) {
    console.error("webhook signature verification failed:", error);
    return NextResponse.json(
      {
        error: `web hook error:${error}`,
      },
      {
        status: 400,
      }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    console.log(invoice, "this is invoice after checkout session");

    try {
      await createOrder(session, invoice);
    } catch (error) {
      console.error("Error while creating order api", error);
      return NextResponse.json(
        {
          error: `error creating order:${error}`,
        },
        {
          status: 400,
        }
      );
    }
  }
  return NextResponse.json({
    recieved: true,
  });
}

const createOrder = async (
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) => {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;
  const { orderNumber, customerEmail, customerName, clerkUserId } =
    metadata as unknown as MetaData;
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  const products = lineItemsWithProduct.data.map((item) => ({
    //   productId: (item.price?.product as Stripe.Product)?.metadata?.id || "",
      productId : parseInt((item.price?.product as Stripe.Product)?.metadata?.id || "", 10),
      name: (item.price?.product as Stripe.Product)?.name || "",
      price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
      quantity: item?.quantity || 0,
    }));

  const orderAPI = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}api/createOrder`,
    {
      headers: {
        "Content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        orderNumber,
        clerkUserId: clerkUserId,
        currency,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customerEmail,
        email: customerEmail,
        amountDiscount: total_details?.amount_discount
          ? total_details?.amount_discount / 100
          : 0,
        products: products,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "Paid",
        orderDate: new Date().toISOString(),
        invoice: invoice
          ? {
              id: invoice.id,
              number: invoice?.number,
              hosted_invoice_url: invoice?.hosted_invoice_url,
            }
          : null,
      }),
    }
  );

  return orderAPI;
};
