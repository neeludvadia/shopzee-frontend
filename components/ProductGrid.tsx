"use client";
import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants";
import { fetchProducts } from "@/app/(client)/utility";
import { Product } from "@/app/(client)/Types";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import {motion,AnimatePresence} from 'motion/react'
import { Loader2 } from "lucide-react";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState<number>(
    productType[0]?.value || 0
  );
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchproduct = async () => {
    const data = await fetchProducts(setIsLoading, selectedTab);
    setProducts(data.data);
  };

  useEffect(() => {
    fetchproduct();
  }, [selectedTab]);

  console.log(products && products);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center
        py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg
        w-full mt-10">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin"/>
            <span className="text-lg font-semibold">Product is Loading...</span>
          </div>
          <span />
        </div>
      ) : (
        <>
        {
          products?.length ? 
          <div className="grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 w-full mt-10 gap-8">{
            products?.map((product, index) => (
              <div key={product?.ProductId}>
            <ProductCard product={product} />
          </div>
        ))
      }
          </div>
        : <NoProductsAvailable selectedTab = {selectedTab}/>
      }
        </>
      )}
    </div>
  );
};

export default ProductGrid;
