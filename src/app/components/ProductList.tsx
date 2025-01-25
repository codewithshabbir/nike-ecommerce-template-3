'use client';
import React, { useEffect, useState } from 'react';
import Card from './Cards/Card';
import { fetchProductList } from '../api/productApi';
import { ProductCardTypes } from '../@types/types';

// Skeleton Loader Component for Products
const ProductSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pb-10 border-b-2">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="p-4">
          <div className="bg-gray-300 animate-pulse h-60 mb-4 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-3/4 mb-2 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-1/2 mb-2 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-1/4 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

const ProductList = () => {
  const [nikeProducts, setNikeProducts] = useState<ProductCardTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      const products: ProductCardTypes[] = await fetchProductList();
      setNikeProducts(products);
      setLoading(false); // Set loading to false once products are fetched
    };

    getProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <ProductSkeletonLoader /> // Show skeleton loader while loading
      ) : (
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
              shortDescription={product.shortDescription}
              image_url={product.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;