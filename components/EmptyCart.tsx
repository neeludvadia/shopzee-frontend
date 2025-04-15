"use client"
import emptyCart from "@/public/emptyCart.png"
import Image from "next/image";
import {easeInOut, motion} from "motion/react"
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
const EmptyCart = () => {
  return (
    <div className="py-10 md:py-20 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div 
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:1}}
      transition={{duration:0.5}}
      className="rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8">
        <motion.div animate={{scale:[1,1.1,1],rotate:[0,-5,5,0]}}
        transition={{repeat:Infinity,duration:5,ease:easeInOut}}
        className="w-48 h-48 mx-auto"
        >
          <Image src={emptyCart}
          alt="no Image"
          className="drop-shadow-lg object-contain"
          layout="fill"
          />
          <motion.div 
          animate={{x:[0,-10,10,0],y:[0,-5,5,0]}}
          transition={{repeat:Infinity,duration:3,ease:"linear"}}
          className="absolute -right-4 -top-4 bg-blue-500 rounded-full p-2">
            <ShoppingCart size={24} className="text-white"/>
          </motion.div>
        </motion.div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Your cart is feeling lonely</h2>
          <p className="text-gray-600">It looks like you haven&apos;t added anything to your cart yet. Let&apos;s change and find
            something products for you!
          </p>
        </div>
        <Link 
        className="block bg-darkColor/5 border border-darkColor/20 text-center py-2.5 rounded-full text-sm
        font-semibold tracking-wide hover:border-darkColor hover:bg-darkColor hover:text-white hoverEffect"
        href={"/"}>Discover Products</Link>
      </motion.div>
    </div>
  );
}

export default EmptyCart;
