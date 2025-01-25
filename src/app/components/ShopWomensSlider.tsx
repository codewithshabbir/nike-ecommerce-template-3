"use client"
import React, {useEffect, useRef, useState} from 'react';
import Slider from "react-slick";
import arrowRightIcon from "@public/images/icons/right-arrow.svg";
import arrowLeftIcon from "@public/images/icons/left-arrow.svg";
import Card from './Cards/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { ProductCardTypes } from '../@types/types';
import { fetchProductListByWomens } from '../api/productApi';

const ShopWomensSlider = () => {
    const sliderRef = useRef<Slider | null>(null);
    const [womensProducts, setWomensProducts] = useState<ProductCardTypes[]>([]);

    // Fetching Mens products using useEffect
    useEffect(() => {
      const fetchData = async () => {
        const products = await fetchProductListByWomens();
        setWomensProducts(products);
      };
      fetchData();
    }, []);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
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
      <div className="flex mb-4 items-center justify-end">
            <div className="flex items-center gap-4">
              <p>Shop Women's</p>
              <div className="bg-[#F5F5F5] px-5 py-4 rounded-full cursor-pointer" onClick={() => sliderRef.current?.slickPrev()}>
                <Image src={arrowLeftIcon} alt="Arrow Left"/>
              </div>
              <div className="bg-[#E5E5E5] px-5 py-4 rounded-full cursor-pointer" onClick={() => sliderRef.current?.slickNext()}>
                <Image src={arrowRightIcon} alt="Arrow Right"/>
              </div>
            </div>
          </div>
      <div className="pb-10">
        <Slider {...settings} ref={sliderRef}>
          {womensProducts.map((product) => (
            <Card
              key={product._id}
              _id={product._id}
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
      </div>
      </>
    );
}

export default ShopWomensSlider