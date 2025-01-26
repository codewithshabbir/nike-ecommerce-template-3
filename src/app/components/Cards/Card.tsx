'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { LucideArrowLeftRight } from "lucide-react";
import { IoEyeOutline } from "react-icons/io5";
import Button from "../Button";
import { ProductCardTypes } from "@/app/@types/types";
import { useCart } from "@/context/CartContext";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card: React.FC<ProductCardTypes> = ({_id, status, name, color, currentPrice, discountedPrice, shortDescription, image_url }) => {
  const { addToCart, toggleAddToCartSidebar, cart } = useCart();
  const [isLoading, setisLoading] = useState(false);

  const isItemInCart = cart.some((item) => item._id === _id);

  // Handles adding the current product to the cart
  const handleAddToCart = () => {
    setisLoading(true)
    const item: ProductCardTypes = {
      _id,
      name,
      image_url,
      currentPrice,
      discountedPrice,
      shortDescription,
      color,
      status,
    };

    setTimeout(() => {
      addToCart(item);
      setisLoading(false);
      toggleAddToCartSidebar(true);

      toast.success(`${name} has been added to the cart!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
        });
    }, 1000); 
  };

  return (
    <div className="group m-auto md:m-0 focus-visible:outline-none">
        <div className="relative bg-gray-50 hover:bg-gray-100 w-full h-[280px] flex items-center rounded-lg overflow-hidden transition-all duration-300 ease-out">
          <Link href={`/shop/${_id}`} className="focus-visible:outline-none">
          <Image
            className="focus-visible:outline-none"
            src={image_url}
            alt={name}
            width={300}
            height={300}
            priority
          />
          </Link>
          {/* Hover Icons */}
          <div className="absolute z-[2] top-4 right-0 opacity-0 transition-all duration-300 ease-out flex flex-col items-end space-y-2 group-hover:opacity-100 group-hover:-translate-x-4">
            <button
              className="bg-white hover:bg-black hover:text-white p-2 text-xl rounded-full shadow-lg transition-all duration-300 ease-out"
              aria-label="Add to Wishlist"
            >
              <CiStar width={24} height={24} />
            </button>
            <button
              className="bg-white hover:bg-black hover:text-white p-2 text-xl rounded-full shadow-lg transition-all duration-300 ease-out"
              aria-label="Compare Product"
            >
              <LucideArrowLeftRight width={20} height={20} />
            </button>
            <button
              className="bg-white hover:bg-black hover:text-white p-2 text-xl rounded-full shadow-lg transition-all duration-300 ease-out"
              aria-label="View Product"
            >
              <IoEyeOutline width={24} height={24} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute z-[2] w-[86%] left-1/2 transform -translate-x-1/2 opacity-0 bottom-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-2" >
            {
              isItemInCart ? (
              <Button
                text="View Bag"
                classNames="rounded-md py-2 uppercase text-sm text-white block"
                link="/cart"
              />
              ): (
              <Button
                text={isLoading ? "Loading..." : "Add to Bag"}
                classNames={`rounded-md py-2 uppercase text-sm ${
                  isLoading ? "bg-transparent" : "bg-black text-white"
                }`}
                clickFun={handleAddToCart}
              />
              )
            }
          </div>
        </div>

       

        {/* Product Details */}
        <div className="pt-4 pb-2">
          <h4 className="text-[#9E3500]">{status}</h4>
          <h2 className="font-semibold">{name}</h2>
          <p className="text-text-secondary-gray">{color}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span>Rs: {currentPrice}</span>
          {discountedPrice && (
            <span className="text-gray-500 line-through">Rs: {discountedPrice}</span>
          )}
        </div>
    </div>
  );
};

export default Card;