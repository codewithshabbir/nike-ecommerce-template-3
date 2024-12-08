// Card.tsx
import Image from "next/image";
import React from "react";

type Product = {
  tags: string;
  title: string;
  description: string;
  color: string;
  price: string;
  imagesUrls: string;
};

const Card: React.FC<Product> = ({
  tags,
  title,
  description,
  color,
  price,
  imagesUrls,
}) => {
  return (
    <div className="mb-6">
      <Image src={imagesUrls} alt={title} width={300} height={300} />
      <div className="py-4">
        <h4 className="text-[#9E3500]">{tags}</h4>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-text-secondary-gray">{description}</p>
        <p className="text-text-secondary-gray">{color}</p>
      </div>
      <h3 className="font-semibold">{price}</h3>
    </div>
  );
};

export default Card;