import { productType } from '@/constants';
import { Repeat } from 'lucide-react';
import React from 'react';
interface Props{
  selectedTab:number
  onTabSelect:(tab:number) => void;
}
const HomeTabBar = ({...Props}:Props) => {
  return (
    <div className='flex items-center gap-1.5 text-sm font-semibold'>
      <div className='flex items-center gap-1.5'>{productType?.map((item)=>(
        <button className={`border border-darkColor px-4 py-1.5 md:py-2 md:px-6
          rounded-full hover:bg-darkColor hover:text-white hoverEffect ${Props.selectedTab === item?.value?
           'bg-darkColor text-white':""
          }`} 
          onClick={()=>{Props.onTabSelect(item?.value)}}
          key={item?.title} value={item?.value}>{item?.title}</button>
      ))}</div>
      <button className='border border-darkColor p-2
          rounded-full hover:bg-darkColor hover:text-white hoverEffect'><Repeat/></button>
    </div>
  );
}

export default HomeTabBar;
