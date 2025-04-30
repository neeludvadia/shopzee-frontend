"use client";
import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";
import useCartStore from "../store";
import { useAuth, useUser } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";
import { Heart, ShoppingBag, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButton from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import paypalLogo from "@/public/paypalLogo.png"
import { createCheckoutSession, MetaData } from "@/actions/createCheckoutSession";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();
  const {user} = useUser();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }
  const cartProduct = getGroupedItems();
  const handleDeleteProduct = (id:string)=>{
    deleteCartProduct(id);
    toast.success(`Product deleted successfully!!`)
  }
  const handleResetCart = ()=>{
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if(confirmed){
      resetCart();
      toast.success("your cart reset successfully");
    }
  }
  const handleCheckout = async()=>{
    try {
      const metaData:MetaData = {
        orderNumber:crypto.randomUUID(),
        customerName:user?.fullName ?? "unknown",
        customerEmail:user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id ?? ""

      };
      const checkoutURL = await createCheckoutSession(cartProduct,metaData);
      if(checkoutURL){
        window.location.href = checkoutURL;
      }
    } catch (error) {
      console.error("Error Creating checkut session",error);
    }finally{
    }
  }
  return (
    <div>
      {isSignedIn ? (
        <Container className="bg-gray-50 pb-52 md:pb-10">
          {cartProduct?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag/>
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
              {/* Product */}
              <div className="lg:col-span-2 rounded-lg">
                <div className="border bg-white rounded-md">
                  {cartProduct?.map((item)=>{
                    const itemCount = getItemCount(item?.product?.ProductId as string)
                    return(
                      <div key={item?.product?.ProductId}
                      className="border-b p-2.5 last:border-b-0 flfex justify-center items-between">
                        <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
                          {item?.product?.imageUrl && 
                          <Link href={`/product/${item?.product?.ProductId}`} className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                          <Image 
                          alt="" src={`${process.env.NEXT_PUBLIC_BACKEND}${item?.product?.imageUrl[0]}`} 
                          width={500} height={500}
                          loading="lazy"
                          className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                          />
                          </Link>
                          }
                          <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                            <div className="space-y-1.5">
                              <h2 className="font-semibold">{item?.product?.name}</h2>
                              <p className="text-sm text-lightColor font-mediums">{item?.product?.productInto}</p>
                              <p className="text-sm capitalize">Varient: <span className="font-semibold">{item?.product?.ProductTypeId}</span></p>
                              <p className="text-sm capitalize">Status: <span className="font-semibold">{item?.product?.ProductStatus}</span></p>
                            </div>
                            <div className="text-gray-500 flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect"/>
                                </TooltipTrigger>
                                  <TooltipContent>
                                    Add To Favorite
                                  </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Trash2Icon onClick={()=>{handleDeleteProduct(item?.product?.ProductId as string)}} className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"/>
                                </TooltipTrigger>
                                  <TooltipContent className="bg-red-600">
                                    Delete Item
                                  </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter amount={(item?.product?.ProductPrice as number) * itemCount}
                            className="font-bold text-lg "
                            />
                            <QuantityButton product={item?.product}/>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <Button onClick={()=>{handleResetCart()}} className="m-5 font-semibold " variant={"destructive"}>Reset Cart</Button>
                </div>
              </div>
              {/* summary */}
              <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubtotalPrice()}/>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubtotalPrice() - getTotalPrice()}/>
                      </div>
                      <Separator/>
                      <div>
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button 
                      onClick={()=>{handleCheckout()}}
                      className="w-full rounded-full font-semibold tracking-wide" size={"lg"}>Proceed to checkout</Button>
                      <Link href={"/"}
                      className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect">
                      <Image src={paypalLogo} alt="" className="w-20"/>
                      </Link>
                    </div>
                  </div>
              </div>
              {/* order summary for mobile view */}
                  <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                    <div className="p-4 rounded-lg border mx-4">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubtotalPrice()}/>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubtotalPrice() - getTotalPrice()}/>
                      </div>
                      <Separator/>
                      <div>
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button 
                      onClick={()=>{handleCheckout()}}
                      className="w-full rounded-full font-semibold tracking-wide" size={"lg"}>Proceed to checkout</Button>
                      <Link href={"/"}
                      className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect">
                      <Image src={paypalLogo} alt="" className="w-20"/>
                      </Link>
                    </div>
                       </div>
                  </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
