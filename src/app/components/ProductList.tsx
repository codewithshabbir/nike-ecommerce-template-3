// ProductList.tsx
import React from 'react';
import { nikeProducts } from './Cards/data'; 
import Card from './Cards/Card';

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 pb-10 border-b-2">
      {nikeProducts.map((product) => (
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

export default ProductList;