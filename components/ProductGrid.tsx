"use client"
import React, { useEffect, useState } from 'react';
import HomeTabBar from './HomeTabBar';
import { productType } from '@/constants';
import Image from 'next/image';

const ProductGrid = () => {
  const [selectedTab,setSelectedTab] = useState<Number>(productType[0]?.value || 0);
  const [products,setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState<Boolean>(false);
  useEffect(()=>{
    const fetchProducts = async ()=>{
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/products`,
          {
            headers:{
              "Content-Type":'application/json'
            },
             method:'post',
            body:JSON.stringify({
              product_type:selectedTab
            })
          }
        )
        if(response.ok){
          const data = await  response.json()
          setProducts(data.data);
        }else{
          console.error(await response.json());
        }
        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  },[selectedTab])

  console.log(products && products);

  return (
    <div className='mt-10 flex flex-col items-center'>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab}/>
      {/* <Image src={products && process.env.NEXT_PUBLIC_URL + products[0]?.imageUrl[0]} alt={""} height={200} width={200}/> */}
    </div>
  );
}

export default ProductGrid;
