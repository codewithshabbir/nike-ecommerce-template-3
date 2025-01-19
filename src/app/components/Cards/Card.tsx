import { ProductCardTypes } from "@/app/@types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card: React.FC<ProductCardTypes> = ({
  _id,
  status,
  name,
  color,
  currentPrice,
  discountedPrice,
  image_url,
}) => {
  return (
    <div className="mb-6 md:mb-6 m-auto md:m-0 px-2 focus-visible:outline-none">
      <Link className="focus-visible:outline-none" href={`/shop/${_id}`}
      >
        <Image className="focus-visible:outline-none" src={image_url} alt={name} width={300} height={300} />
      <div className="pt-4 pb-2 focus-visible:outline-none">
        <h4 className="text-[#9E3500]">{status}</h4>
        <h2 className="font-semibold">{name}</h2>
        <p className="text-text-secondary-gray">{color}</p>
      </div>
      <div> <span>Rs: {currentPrice}</span> <span className='text-gray-500 line-through'>Rs: {discountedPrice}</span></div>
      </Link>
    </div>
  );
};

export default Card;