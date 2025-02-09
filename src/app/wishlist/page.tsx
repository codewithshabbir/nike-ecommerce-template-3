'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button";
import { useGlobalState } from "@/context/GlobalStateContext";
import { FaHeartBroken, FaTrash } from "react-icons/fa";
import { ProductCardTypes } from "../@types/types";

const Page = () => {
  const { addToCart, toggleAddToCartSidebar, cart, wishlist, removeFromWishlist } = useGlobalState();

  const isItemInCart = (itemId:string) => {
    return cart.some((item) => item._id === itemId);
  } 

  const [loading, setLoading] = useState(true);  
  const [cartLoading, setCartLoading] = useState<{[key: string]: Boolean}>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [wishlist]);

  const handleAddToCart = (item: ProductCardTypes) => {
    setCartLoading((prev)=> ({...prev, [item._id]:true}));
    setTimeout(() => {
      addToCart(item);
      setCartLoading((prev)=> ({...prev, [item._id]:false}));
      toggleAddToCartSidebar(true);
    }, 1000); 
  };

  const handleRemoveItem = (itemId:string) => removeFromWishlist(itemId);

  return (
    <div className="min-h-screen py-10">
      {wishlist.length === 0 ? (
        <div className="w-full my-20 flex flex-col items-center justify-center">
          <FaHeartBroken className="text-9xl text-gray-500 mb-6" />
          <h2 className="text-5xl font-semibold text-gray-700 mb-4">Your Favourites is Empty!</h2>
          <p className="text-lg text-gray-600 mb-8">Save your favorite items to view them later.</p>
          <div>
            <Button
                text="Return to Shop"
                classNames="rounded-md px-8 py-3 bg-black text-white hover:bg-gray-800 transition"
                link="/shop"
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-20 py-10">
          <h2 className="text-3xl font-bold mb-8">My Favourites</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th></th>
                  <th className="text-left py-4 px-4">Product</th>
                  <th className="text-left py-4 px-4">Unit Price</th>
                  <th className="text-left py-4 px-4">Discounted Price</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(wishlist.length)].map((_, index) => (
                    <tr key={index} className="border-b animate-pulse">
                      <td className="py-4 px-2">
                        <div className="h-10 w-10 bg-gray-300 rounded-md" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gray-300 rounded-md mr-4" />
                          <div className="h-5 w-32 bg-gray-300 rounded" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-5 w-24 bg-gray-300 rounded" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-5 w-20 bg-gray-300 rounded" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-5 w-20 bg-gray-300 rounded" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-10 w-20 bg-gray-300 rounded" />
                      </td>
                    </tr>
                  ))
                ) : (
                  wishlist.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                            width={64}
                            height={64}
                          />
                          <div>
                            <h3 className="text-lg font-medium">{item.name}</h3>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-800">
                          <span className="line-through text-gray-400 mr-2">{item.currentPrice}</span>
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-800">
                          <span className="mr-2">{item.discountedPrice}</span>
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-green-600">{item.status}</p>
                      </td>
                      <td className="px-4">
                        {/* Add to Cart Button */}
                        {
                        isItemInCart(item._id) ? (
                        <Button
                            text="View Bag"
                            classNames="rounded-md py-2 uppercase text-sm text-white block"
                            link="/cart"
                        />
                        ): (
                        <Button
                            text={cartLoading[item._id] ? "Loading..." : "Add to Bag"}
                            classNames={`rounded-md py-2 uppercase text-sm ${
                            cartLoading[item._id] ? "bg-transparent" : "bg-black text-white"
                            }`}
                            clickFun={() => handleAddToCart(item)}
                        /> )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;