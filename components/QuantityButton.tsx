import { Product } from "@/app/(client)/Types";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useCartStore from "@/app/(client)/(user)/faqs/store";
import toast from "react-hot-toast";
interface Props {
  product: Product;
  className?: string;
}
function QuantityButton({ product, className }: Props) {
  const {addItem, getItemCount, removeItem} = useCartStore();
  const itemsCount = getItemCount(product?.ProductId as string)
  const isOutOfStock = product?.Stock === 0;

  const handleRemoveProduct = ()=>{
    removeItem(product?.ProductId as string)
    if(itemsCount > 1){
      toast.success("Quantity Decreased Successfully")
    }else{
      toast.success(`${product?.name?.substring(0,12)} removed successfully!`)
    }
  }

  return (
    <div className={cn( `flex items-center gap-1 text-base pb-1`,className)}>
      <Button 
      onClick={handleRemoveProduct}
      disabled = {itemsCount === 0 || isOutOfStock}
      variant={"outline"} size={"icon"} className="w-6 h-6">
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor pb-1">{itemsCount}</span>
      <Button 
      disabled={isOutOfStock}
      onClick={()=>{
        addItem(product);
        toast.success(`${product?.name?.substring(0,12)}... added successfully!!`)
      }}
      variant={"outline"} size={"icon"} className="w-6 h-6"><Plus/></Button>
    </div>
  );
}

export default QuantityButton;
