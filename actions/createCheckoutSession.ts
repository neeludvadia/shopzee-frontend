"use server"
import { CartItem } from "@/app/(client)/store"
import stripe from "@/lib/stripe";
import Stripe from "stripe";

export interface MetaData {
  orderNumber:string,
  customerName:string,
  customerEmail:string,
  clerkUserId:string
}

export interface CartItems {
  products:CartItem['product'];
  quantity:number;
}

export async function createCheckoutSession(items:CartItem[],metaData:MetaData){
const customers = await stripe.customers.list({
  email:metaData?.customerEmail,
  limit:1,
})
const customerId = customers.data.length > 0 ? customers?.data[0]?.id : "";
try {
  
  const sessionPayload:Stripe.Checkout.SessionCreateParams = {
    metadata:{
      orderNumber:metaData?.orderNumber,
      customerName:metaData?.customerName,
      customerEmail:metaData?.customerEmail,
      clerkUserId:metaData?.clerkUserId
    },
    mode:"payment",
    allow_promotion_codes:true,
    payment_method_types:["card"],
    invoice_creation:{
      enabled:true
    },
    success_url:`${process.env.FRONTEND_URL}success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metaData?.orderNumber}`,
    cancel_url:`${process.env.FRONTEND_URL}cart`,
    line_items:items?.map((item)=>({
      price_data:{
        currency:'USD',
        unit_amount:Math.round(item?.product?.ProductPrice! * 100),
        product_data:{
          name:item?.product?.name || "unnamed product",
          description:item?.product?.Description,
          metadata:{id:item?.product?.ProductId},
          // images:item?.product?.imageUrl && item?.product?.imageUrl?.length > 0 ?
          // [`${process.env.NEXT_PUBLIC_BACKEND}${item?.product?.imageUrl?.[0]}`]:undefined  
        }
      },
      quantity:item?.quantity,
    }
  ))
};
if(customerId){
  sessionPayload.customer = customerId;
}else{
  sessionPayload.customer_email = metaData?.customerEmail;
}
const session = await stripe.checkout.sessions.create(sessionPayload)
return session?.url
} catch (error) {
 console.error("error from stripe during checkout",error);
 throw error; 
}
}