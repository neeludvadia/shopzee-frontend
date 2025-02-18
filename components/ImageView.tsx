"use client"
import React, { useState } from 'react';
import {AnimatePresence, motion} from "motion/react"
import Image from 'next/image';
interface Props {
  images: string[];
}
const ImageView = ({images}:Props) => {
  const [activeImage,setActiveImage] = useState(images[0])
  return (
    <div className='w-full md:1/2 space-y-2 md:space-y-4'>
      <AnimatePresence mode='wait'>
        <motion.div 
        key={activeImage?activeImage:""}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration: 0.3}}
        className='w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden'>
          <Image src={`${process.env.NEXT_PUBLIC_BACKEND}${activeImage}`} 
          alt=''
          width={700}
          height={700}
          priority
          className='w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md'
          />
        </motion.div>
      </AnimatePresence>
      <div className='grid grid-cols-6 gap-2 h-20 md:h-28'>
        {images?.map((item,index)=>(
          <button
          onClick={()=>setActiveImage(item)} 
          key={item?item:""} className={`border rounded-md overflow-hidden ${activeImage === item?"ring-1 ring-darColor":""}`}>
            <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND}${images[index]}`}
            alt=''
            width={100}
            height={100}
            className='w-full h-auto object-contain'
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageView;
