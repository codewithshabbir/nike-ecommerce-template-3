import React from 'react';
import Card from './Cards/Card';
import { fetchProductList } from '../api/productApi';
import { ProductCardTypes } from '../@types/types';

const ProductList = async () => {

  const nikeProducts:ProductCardTypes[] = await fetchProductList();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pb-10 border-b-2">
      {nikeProducts.map((product) => (
        <Card
          key={product._id.split('-')[1]}
          _id={product._id.split('-')[1]}
          status={product.status}
          name={product.name}
          color={product.color}
          currentPrice={product.currentPrice}
          discountedPrice={product.discountedPrice}
          image_url={product.image_url}
        />
      ))}
    </div>
  );
};

export default ProductList;