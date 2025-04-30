"use client";
import React from 'react';
import  Link  from 'next/link';
import { usePathname } from 'next/navigation';
import { CategoriesData } from '@/app/(client)/Types';

interface Props {
  categories:CategoriesData[]
}


const HeaderMenu = ({categories}:Props) => {
  const pathname = usePathname();
  return (
    <div className='hidden md:text-nowrap md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold'>
      <Link href={"/"} 
      className={`hover:text-darkColor hoverEffect relative group ${pathname === "/" && "text-darkColor"}`}
      >Home
      <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === "/" && "w-1/2"}`}/>
      <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === "/" && "w-1/2"}`}/>
      </Link>
      {
        categories?.map((item)=>(
            <Link key={item?.CategoryId} href={`/category/${item?.title}`}
            className={`hover:text-darkColor hoverEffect relative group ${pathname === "/category" + item?.title && "text-darkColor"}`}
            >{item?.title}
            <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname == "/category/" + item?.title && "w-1/2"}`}/>
            <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname == "/category/" + item?.title && "w-1/2"}`}/>
            </Link>
          )
        )
      }
    </div>
  );
}

export default HeaderMenu;
