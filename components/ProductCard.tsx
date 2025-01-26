import React from 'react';
import { Product } from '@/app/(client)/Types';
import Link from 'next/link';
import Image from 'next/image';
type Props = {
  product:Product
}
const ProductCard = ({...Props}:Props) => {
  return (
    <div className='group text-sm rounded-lg overflow-hidden'>
      <div className='bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200
      overflow-hidden
      '>
        {Props?.product?.imageUrl && <Link href={"/product"}>
        <Image src={`${process.env.NEXT_PUBLIC_BACKEND}${Props.product.imageUrl[0]}`} alt='productImage' 
        width={500} height={500} priority
        className='w-full h-72 object-contain overflow-hidden
        group-hover:scale-105 hoverEffect
        '
        />
        </Link>}
      </div>
      <div></div>
    </div>
  );
}

export default ProductCard;
