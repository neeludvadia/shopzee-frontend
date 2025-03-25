"use client";
import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Product } from "@/app/(client)/Types";
import Image from "next/image";
import Link from "next/link";
import PriceView from "./PriceView";
import AddToCart from "./AddToCart";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const fetchProduct = useCallback(async () => {
    if (!search) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/searchProducts?search=${search}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 404) {
        setProducts([]);
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setProducts(data?.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debouncetimer = setTimeout(() => {
      fetchProduct();
    }, 300);
    return () => clearTimeout(debouncetimer);
  }, [search, fetchProduct]);

  return (
    <Dialog
      open={showSearch}
      onOpenChange={() => {
        setShowSearch(!showSearch);
      }}
    >
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="2-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>
      <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>
          <div className="relative">
            <Input
              placeholder="Search your product here..."
              className="flex-1 rounded-md py-5"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></Input>
            {search && (
              <X
                onClick={() => {
                  setSearch("");
                }}
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              className={`absolute right-0 top-0 bg-darkColor/10 w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-darkColor hover:text-white hover:Effect ${search ? "bg-darkColor" : "text-white"}`}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>
        <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md p-4">
          <div>
            {loading ? (
              <p className="flex item-center px-6 py-10 gap-1 text-center text-yellow-600 font-semibold">
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching in progress....
              </p>
            ) : products?.length ? (
              products?.map((item, index) => {
                return (
                  <div key={item?.ProductId} className="bg-white overflow-hidden border-b last:border-b-0">
                    <div className="flex items-center p-1">
                    <Link href={`/product/${item?.ProductTypeId}`} className="h-20 w-20 md:h-24 md:24 flex-shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
                    onClick={()=>{setShowSearch(false)}}>
                      {item && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND}${item?.imageUrl[0]}`}
                          width={200}
                          height={200}
                          alt=""
                          className="object-cover w-full h-full
                          group-hover:scale-110 hoverEffect"
                        />
                      )}
                    </Link>
                    <div className="px-4 py-2 flex-grow">
                      <Link href={`/product/${item?.ProductTypeId}`} onClick={()=>{setShowSearch(false)}}>
                      <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">{item?.name}</h3>
                      <p className="textx-sm text-gray-600 line-clamp-1">{item?.productInto}</p>
                      </Link>
                      <PriceView price={item?.ProductPrice} discount={item?.DiscountPrice} className="md:text-lg"/>
                    </div>
                    <div className="w-60 mt-1">
                    <AddToCart product={item}/>
                    </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 font-semibold tracking-wide">
                {search && !loading? (
                  <p>
                    Nothing match with the keyword{" "}
                    <span className="underline text-red-600">{search}</span>.
                    Please try something else
                  </p>
                ) : (
                  <p className="text-green-600 flex items-center justify-center gap-1">
                    <Search className="w-5 h-5" />
                    Search and explore your products Shopzee
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
