"use client"
import { CategoriesData, Product } from '@/app/(client)/Types';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { fetchProductsByCategory } from '@/app/(client)/utility';
import { AnimatePresence, motion } from 'motion/react';
import ProductCard from './ProductCard';
import NoProductsAvailable from './NoProductsAvailable';

interface Props {
  category:CategoriesData[],
  id:string
}

const CategoryProducts = ({category,id}:Props) => {
  const [currentCategory,setCurrentCategory] = useState(id);
  const [product,setProduct] = useState<Product[]>([]);

  const fetchProduct  = async ()=>{
    try {
      const product = await fetchProductsByCategory(currentCategory);
      if(product){
        setProduct(product);
      }else{
        console.error("fetcching error");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[currentCategory])

  return (
    <div className='py-5 flex flex-col md:flex-row items-start gap-5'>
      <div className='flex flex-col md:min-w-40 border'>
        {category?.map((item)=>{
          return (
            <Button key={item?.CategoryId}
            onClick={()=>{setCurrentCategory(item?.title as string);}}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80
              hover:text-white font-semibold hoverEffect border-b last:border-b-0
              ${item?.title === currentCategory && "bg-darkColor text-white"} 
              `}
            >
              {item?.title}
            </Button>
          )
        })}
      </div>
      <div className='w-full'>
        {
          product?.length ? 
          <div className="grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 w-full gap-8">{
            product?.map((product, index) => (
              <AnimatePresence key={index}>
                <motion.div layout initial={{opacity:-0.2}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                key={product?.ProductId}>
            <ProductCard product={product} />
          </motion.div>
              </AnimatePresence>
        ))
      }
          </div>
        : <NoProductsAvailable selectedTab = {currentCategory}/>
      }
      </div>
    </div>
  );
}

export default CategoryProducts;

