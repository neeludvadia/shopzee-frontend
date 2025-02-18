import React from 'react';
import { fetchProductsById } from '../../utility';

const page = async({params}:{params:Promise<{id:number}>}) => {
  const {id} = await params;

  const fetchProduct = await fetchProductsById(id);
  console.log(fetchProduct && fetchProduct,"-------------")

  return (
    <div>
      Single Product
    </div>
  );
}

export default page;
