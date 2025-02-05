import React from 'react';
import { Product } from '@/app/(client)/Types';
import Link from 'next/link';
import Image from 'next/image';
import PriceView from './PriceView';
import AddToCart from './AddToCart';
type Props = {
  product:Product
}
const ProductCard = ({...Props}:Props) => {
  return (
    <div className='group text-sm rounded-lg overflow-hidden'>
      <div className='bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200
      overflow-hidden relative
      '>
        {Props?.product?.imageUrl && <Link href={`/product/${Props?.product?.ProductId}`}>
        <Image src={`${process.env.NEXT_PUBLIC_BACKEND}${Props.product.imageUrl[0]}`} alt='productImage' 
        width={500} height={500} priority
        className='w-full h-72 object-contain overflow-hidden
        group-hover:scale-105 hoverEffect'
        />
        </Link>}
        {Props?.product?.Stock === 0 && (
        <div className='absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center'>
          <p className='text-base text-white font-semibold text-center'>
            Out of Stock
            </p>
            </div>
        )}
      </div>
      <div className='py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounde-tr-none'>
        <h2 className='font-semibold line-clamp-1'>{Props?.product?.name}</h2>
        <p>{Props?.product?.productInto}</p>
        <PriceView className='text-lg' price={Props?.product?.ProductPrice} discount={Props?.product?.DiscountPrice }/>
        <AddToCart product={Props?.product}/>
      </div>
    </div>
  );
}

export default ProductCard;
