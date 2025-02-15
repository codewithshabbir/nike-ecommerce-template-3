"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { ProductCardTypes } from "@/app/@types/types";
import Button from "./Button";
import { useGlobalState } from "@/context/GlobalStateContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface QuickViewProps {
  product: ProductCardTypes | null;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewProps> = ({ product, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart, toggleAddToCartSidebar, cart, addToWishlist, wishlist } =
    useGlobalState();
  const [isLoading, setIsLoading] = useState(false);

  // Check if the product is in the cart or wishlist
  const isItemInCart = product
    ? cart.some((item) => item._id === product._id)
    : false;
  const isItemInWishlist = product
    ? wishlist.some((item) => item._id === product._id)
    : false;

  useEffect(() => {
    // Trigger the animation when the product is set
    if (product) {
      setIsVisible(true);
    }
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Handles adding the current product to the cart
  const handleAddToCart = () => {
    if (!product) return;

    setIsLoading(true);
    const item: ProductCardTypes = {
      _id: product._id,
      name: product.name,
      image_url: product.image_url,
      currentPrice: product.currentPrice,
      discountedPrice: product.discountedPrice,
      shortDescription: product.shortDescription,
      color: product.color,
      status: product.status,
    };

    setTimeout(() => {
      addToCart(item);
      setIsLoading(false);
      toggleAddToCartSidebar(true);
    }, 1000);
  };

  // Handles adding the current product to the wishlist
  const handleWishlist = () => {
    if (!product) return;

    const item: ProductCardTypes = {
      _id: product._id,
      name: product.name,
      image_url: product.image_url,
      currentPrice: product.currentPrice,
      discountedPrice: product.discountedPrice,
      shortDescription: product.shortDescription,
      color: product.color,
      status: product.status,
    };
    addToWishlist(item);
  };

  if (!product) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Modal Content */}
      <div
        className={`bg-white w-full max-w-2xl rounded-md shadow-2xl p-10 relative transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoClose size={26} />
        </button>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={product.image_url}
              alt={product.name}
              width={280}
              height={280}
              className="rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {product.shortDescription}
            </p>
            <p className="text-sm text-gray-400 mt-1">Color: {product.color}</p>

            {/* Pricing */}
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-lg font-semibold text-red-600">
                Rs: {product.discountedPrice}
              </span>
              {product.currentPrice && (
                <span className="text-gray-500 line-through text-sm">
                  Rs: {product.currentPrice}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              {isItemInCart ? (
                <Button
                  text="View Bag"
                  classNames="rounded-md py-2 uppercase text-sm text-white block"
                  link="/cart"
                />
              ) : (
                <Button
                  text={isLoading ? "Loading..." : "Add to Bag"}
                  classNames={`rounded-md py-2 uppercase text-sm ${
                    isLoading ? "bg-transparent" : "bg-black text-white"
                  }`}
                  clickFun={handleAddToCart}
                />
              )}
              <div
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                onClick={handleWishlist}
              >
                {isItemInWishlist ? (
                  <FaHeart className="text-black w-8 h-6" />
                ) : (
                  <FaRegHeart className="text-gray-500 w-8 h-6" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;