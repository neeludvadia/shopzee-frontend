import { Product } from "@/app/(client)/Types";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
interface Props {
  product: Product;
  className?: string;
}
function QuantityButton({ product, className }: Props) {
  const itemCount = 0;
  return (
    <div className={cn( `flex items-center gap-1 text-base`,className)}>
      <Button variant={"outline"} size={"icon"} className="w-6 h-6">
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center etxt-darkColor pb-1">{itemCount}</span>
      <Button variant={"outline"} size={"icon"} className="w-6 h-6"><Plus/></Button>
    </div>
  );
}

export default QuantityButton;
