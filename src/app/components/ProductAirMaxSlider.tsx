"use client";
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import arrowRightIcon from "@public/images/icons/right-arrow.svg";
import arrowLeftIcon from "@public/images/icons/left-arrow.svg";
import Card from './Cards/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { fetchProductListByAirMax } from '../api/productApi';
import { ProductCardTypes } from '../@types/types';

const ProductSlider = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [airMaxProducts, setAirMaxProducts] = useState<ProductCardTypes[]>([]);
  const [loading, setLoading] = useState(true);

  // Skeleton Loader Component for Products
  const ProductSkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pb-10 border-b-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="p-4">
          <div className="bg-gray-300 animate-pulse h-60 mb-4 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-3/4 mb-2 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-1/2 mb-2 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-1/4 rounded-md"></div>
        </div>
      ))}
    </div>
  );

  // Fetching Air Max products using useEffect
  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductListByAirMax();
      setAirMaxProducts(products);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="font-bold">Best of Air Max</h2>
        <div className="flex items-center gap-4">
          <p>Shop</p>
          <div
            className="bg-[#F5F5F5] px-5 py-4 rounded-full cursor-pointer"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <Image src={arrowLeftIcon} alt="Arrow Left" />
          </div>
          <div
            className="bg-[#E5E5E5] px-5 py-4 rounded-full cursor-pointer"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <Image src={arrowRightIcon} alt="Arrow Right" />
          </div>
        </div>
      </div>
      <div className="pb-10">
        {loading ? (
          <ProductSkeletonLoader />
        ) : (
          <Slider {...settings} ref={sliderRef}>
            {airMaxProducts.map((product) => (
              <Card
                key={product._id.split('-')[1]}
                _id={product._id.split('-')[1]}
                status={product.status}
                name={product.name}
                color={product.color}
                currentPrice={product.currentPrice}
                shortDescription={product.shortDescription}
                discountedPrice={product.discountedPrice}
                image_url={product.image_url}
              />
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default ProductSlider;