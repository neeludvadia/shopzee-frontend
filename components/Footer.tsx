"use client"
import React from 'react';
import Container from './Container';
import FooterTop from './FooterTop';
import Logo from './Logo';
import SocialMedia from './SocialMedia';
import { Input } from './ui/input';
import { categoriesData, quickLinksData } from '@/constants';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-white border-t'>
      <Container>
        <FooterTop/>
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
        <Logo>Shopzee</Logo>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam officiis pariatur obcaecati</p>
        <SocialMedia className='text-darkColor/60'
        iconClassName="border-darkColor/60 hover:border-darkColor 
        hover:text-darkColor" 
        tooltipClassName='bg-darkColor text-white'/>
          </div>
        <div>
        <h3 className='font-semibold text-darkColor mb-4'>Quick Links</h3>
        <div className='flex flex-col gap-3'>
          {quickLinksData?.map((item,index)=>(
            <Link className='text-gray-600 hover:text=darkColor text-sm font-medium hoverEffect'
             href={item.href} key={item.title}>{item.title}</Link>
          ))}
        </div>
        </div>
        <div>
        <h3 className='font-semibold text-darkColor mb-4'>Categories</h3>
        <div className='flex flex-col gap-3'>
          {categoriesData?.map((item,index)=>(
            <Link className='text-gray-600 hover:text=darkColor text-sm font-medium hoverEffect'
             href={`/category${item.href}`} key={item.title}>{item.title}</Link>
          ))}
        </div>
        </div>
        <div>
        <h3 className='font-semibold text-darkColor mb-4'>Newsletter</h3>
        <p className='text-gray-600 text-sm mb-4'>Subscribe to our newsletter to recieve updates and exclusive offers.</p>
        <form className='space-y-3'>
          <Input 
          type='email' 
          placeholder='Enter your email' 
          required
          onInvalid={e => e.currentTarget.setCustomValidity("email is required")}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-gray-300'
          />
          <button className='w-full bg-darkColor text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition-colors' 
          type='submit'>Subscribe</button>
        </form>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
