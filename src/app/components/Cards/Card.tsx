import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  id:number;
  tags: string;
  title: string;
  description: string;
  color: string;
  price: string;
  imagesUrls: string;
};

const Card: React.FC<Product> = ({
  id,
  tags,
  title,
  description,
  color,
  price,
  imagesUrls,
}) => {
  return (
    <div className="mb-6 md:mb-6 m-auto md:m-0 px-2 focus-visible:outline-none">
      <Link className="focus-visible:outline-none" href={`/all-products/${id}`}
      >
        <Image className="focus-visible:outline-none" src={imagesUrls} alt={title} width={300} height={300} />
      <div className="py-4 focus-visible:outline-none">
        <h4 className="text-[#9E3500]">{tags}</h4>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-text-secondary-gray">{description}</p>
        <p className="text-text-secondary-gray">{color}</p>
      </div>
      <h3 className="font-semibold focus-visible:outline-none">{price}</h3>
      </Link>
    </div>
  );
};

export default Card;