"use client";
import { ProductCardTypes, ProductListTypes } from "@/app/@types/types";
import { fetchSingleProduct } from "@/app/api/productApi";
import Button from "@/app/components/Button";
import StarRating from "@/app/components/StarRating";
import { useGlobalState } from "@/context/GlobalStateContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";

const SkeletonLoader = () => (
  <div className="animate-pulse grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-0 md:gap-10">
    {/* Image Skeleton */}
    <div className="col-span-12 md:col-span-6">
      <div className="w-[500px] h-[500px] bg-gray-300 rounded-md"></div>
    </div>

    {/* Content Skeleton */}
    <div className="col-span-12 md:col-span-6 pr-18 pt-10 md:pt-0">
      <div className="h-5 w-32 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-8 w-64 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-5 w-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-5 w-full bg-gray-300 rounded-md mb-4"></div>
      <div className="h-5 w-48 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-12 w-40 bg-gray-300 rounded-md mt-4"></div>
    </div>
  </div>
);

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductListTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Initially true

  const {
    addToWishlist,
    removeFromWishlist,
    wishlist,
    addToCart,
    toggleAddToCartSidebar,
    cart,
  } = useGlobalState();

  // Check if product is already in the wishlist
  const isItemInWishlist =
    productData &&
    wishlist.some((item) => item._id === productData._id.split("-")[1]);

  // Handle Wishlist
  const handleWishlist = () => {
    if (!productData) return;

    const item: ProductCardTypes = {
      _id: productData._id.split("-")[1],
      name: productData.name,
      image_url: productData.image_url,
      currentPrice: productData.currentPrice,
      discountedPrice: productData.discountedPrice,
      shortDescription: productData.shortDescription,
      color: productData.color,
      status: productData.status,
    };

    if (isItemInWishlist) {
      removeFromWishlist(item._id); // Remove if already in wishlist
    } else {
      addToWishlist(item); // Add if not in wishlist
    }
  };

  // Resolve `params` and set `id`
  useEffect(() => {
    params.then((resolvedParams) => {
      if (!resolvedParams.id) {
        console.error("Product ID is missing!");
        return;
      }
      setId(resolvedParams.id);
    });
  }, [params]);

  // Fetch product data based on the `id`
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSingleProduct(id);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false); // ✅ Stop loading when data is fetched
      }
    };

    fetchProduct();
  }, [id]);

  // Check if the product is already in the cart
  const isItemInCart =
    productData &&
    cart.some((item) => item._id === productData._id.split("-")[1]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!productData) return;

    setIsLoading(true);

    const item: ProductCardTypes = {
      _id: productData._id.split("-")[1],
      name: productData.name,
      image_url: productData.image_url,
      currentPrice: productData.currentPrice,
      discountedPrice: productData.discountedPrice,
      shortDescription: productData.shortDescription,
      color: productData.color,
      status: productData.status,
    };

    addToCart(item);
    setIsLoading(false);
    toggleAddToCartSidebar(true);
  };

  // if (!id) {
  //   return <p>Loading product...</p>;
  // }

  if (isLoading || !productData) {
    return <SkeletonLoader />; // ✅ Show Skeleton Loader
  }

  return (
    <div className="grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-0 md:gap-10">
      <div className="col-span-12 md:col-span-6">
        <Image
          src={productData.image_url}
          alt={productData.name}
          width={500}
          height={500}
        />
      </div>
      <div className="col-span-12 md:col-span-6 pr-18 pt-10 md:pt-0">
        <h3 className="font-bold text-[#9E3500]">{productData.status}</h3>
        <h2 className="text-3xl">{productData.name}</h2>
        <div className="flex gap-2 items-center">
          <StarRating rating={productData.rating} />
          <span>{productData.rating}</span>
        </div>
        <p className="py-4">{productData.shortDescription}</p>
        <div>
          <span>Rs: {productData.currentPrice}</span>
          <span className="text-gray-500 line-through">
            Rs: {productData.discountedPrice}
          </span>
        </div>
        <div className="flex my-4 gap-2">
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
          {/* Wishlist Button */}
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
        <div>
          Tags:{" "}
          {productData.tags.map((tag) => (
            <span
              key={tag}
              className="bg-black text-white px-2 py-[0.5px] mx-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="py-2">
          <span className="font-bold">SKU:</span> {productData.sku}
        </p>
        <p className="flex gap-2">
          <span className="text-2xl font-bold">
            <TbTruckReturn />
          </span>
          {productData.returnPolicy}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
