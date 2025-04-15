"use client";
import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";
import useCartStore from "../store";
import { useAuth, useUser } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  const user = useUser();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }
  const cartProduct = getGroupedItems();
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
                  {cartProduct?.map((item,index)=>{
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
                          <div>
                            <div>
                              <h2>{item?.product?.name}</h2>
                              <p>{item?.product?.productInto}</p>
                              <p>Varient: <span>{item?.product?.ProductTypeId}</span></p>
                              <p>Status: <span>{item?.product?.ProductStatus}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* summary */}
              <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
