import React from 'react';
import { nikeProducts } from './Cards/data'; 
import Card from './Cards/Card';

const ProductSlider = () => {
  const airMaxProducts = nikeProducts.filter((product) =>
    product.title.toLowerCase().includes('air max')
  );

  return (
    <div className="flex flex-wrap gap-4 pb-10 border-b-2 overflow-x-auto">
      {airMaxProducts.map((product) => (
        <Card
          key={product.id}
          tags={product.tags}
          title={product.title}
          description={product.description}
          color={product.color}
          price={product.price}
          imagesUrls={product.imagesUrls}
        />
      ))}
    </div>
  );
};

export default ProductSlider;