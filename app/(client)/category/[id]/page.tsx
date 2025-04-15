import Container from '@/components/Container';
import React from 'react';
import { fetchAllCategories } from '../../utility';
import Title from '@/components/Title';
import CategoryProduct from '@/components/CategoryProducts';

const CategoryPage = async({params}:{params:Promise<{id:string}>}) => {
  const category = (await params).id;
  const categories = await fetchAllCategories();
  return (
    <Container className='py-10'>
      <Title className={"text-xl"}>
        Products by Category 
        {/* <span className='font-bold text-green-600 capitalize tracking-wide'>{category}</span> */}
        </Title>
        <CategoryProduct category={categories} id={category}/>
    </Container>
  );
}

export default CategoryPage;
