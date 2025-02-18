import React from 'react';
import { fetchProductsById } from '../../utility';
import Container from '@/components/Container';
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import AddToCart from '@/components/AddToCart';
import { BoxIcon, Heart } from 'lucide-react';
import Productcharacteristics from '@/components/Productcharacteristics';

const SingleProductPage = async({params}:{params:Promise<{id:number}>}) => {
  const {id} = await params;

  const fetchProduct = await fetchProductsById(id);

  return (
    <Container className='py-10 flex flex-col md:flex-row gap-10'>
      {
        fetchProduct && <ImageView images={fetchProduct?.imageUrl}/>
      }
      <div className='w-full md:w-1/2 flex flex-col gap-5'>
      <div>
        <h2 className='text-3xl md:text-4xl font-bold mb-2'>
        {fetchProduct?.name}</h2>
        <PriceView
        price={fetchProduct?.ProductPrice}
        discount={fetchProduct?.DiscountPrice}
        className={`text-lg font-bold`}
        />
        </div>
        {fetchProduct?.Stock && <p
        className='bg-green-100 w-24 text-center text-green-600 text-sm py-2.5
        font-semibold rounded-lg'
        >In Stock</p>}
        <p className='text-sm text-gray-600 tracking-wide'>{fetchProduct?.Description}</p>
        <div className='flex items-center gap-2.5 lg:gap-5'>
          <AddToCart
          className='bg-darkColor/80 text-white hover:bg-darkColor hoverEffect'
          product={fetchProduct??""}
          />
          <button className='border-2 border-darkColor/30 text-darkColor/60 px-2.5 py-1.5 rounded-md hover:border-darkcolor hoverEffect'>
          <Heart className='w-5 h-5'/>
          </button>
        </div>
        <Productcharacteristics product={fetchProduct}/>
        <div className='flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5'>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <BoxIcon/>
            <p>Compare color</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <BoxIcon/>
            <p>Compare color</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <BoxIcon/>
            <p>Compare color</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <BoxIcon/>
            <p>Compare color</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SingleProductPage;
