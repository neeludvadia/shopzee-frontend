import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/app/(client)/Types";
import QuantityButton from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";
interface Props {
  product: Product;
  className?: string;
}
const AddToCart = ({ product, className }: Props) => {
  const isOutOfStock = product?.Stock === 0;
  const itemsCount = 0;
  return (
    <div>
      {itemsCount?<div className="w-full text-sm"> 
        <div className="flex justify-between p-1">
          <span className="text-xs text-muted-foreground">Quantity</span>
          <QuantityButton product={product}/>
        </div>
        <div className="flex items-center justify-center border-t pt-1">
          <span className="text-xs font-semibold">Subtotal</span>
          <PriceFormatter amount={product?.ProductPrice? product?.ProductPrice*itemsCount:0}/>
        </div>
         </div>:
    <Button
    disabled={isOutOfStock}
    className={cn(`w-full bg-transparent text-darkColor shadow-none border border-darkColor/30
      font-semibold tracking-wide hover:text-white hoverEffect
      ${product?.Stock !== 0?"opacity-80":"group-hover:scale-105"}`,className)}
      >
      AddToCart
    </Button>
      }
      </div>
  );
};

export default AddToCart;
