import { client } from "@/sanity/lib/client";
import { ProductCardTypes } from "../@types/types";

export const fetchProductList = async () => {
  // GROQ query to fetch all products
  const query = `
    *[_type == "product"] {
      _id,
      name,
      currentPrice,
      discountedPrice,
      color,
      status,
      brandName,
      'image_url': image.asset->url
    }`;

  // Fetch data from Sanity
  const products:ProductCardTypes[] = await client.fetch(query);
 
  const sortedProducts = products
    .map((product) => ({
      ...product,
      numericId: parseInt(product._id.split('-')[1]),
    }))
    .sort((a, b) => a.numericId - b.numericId);

  return sortedProducts;
};

export const fetchSingleProduct = async (id:string) => {
  // GROQ query to fetch single product
  const query = `
    *[_type == "product" && _id == "product-${id}"]{
      _id,
      name,
      description,
      shortDescription,
      currentPrice,
      discountedPrice,
      color,
      colors,
      category,
      inventory,
      brandName,
      tags,
      status,
      sku,
      returnPolicy,
      rating,
      'image_url': image.asset->url
    }[0]
`;

  // Fetch data from Sanity
  const products = await client.fetch(query);
  return products;
};

export const fetchProductListByAirMax = async () => {
  // GROQ query to fetch air max products
  const query = `
    *[_type == "product" && name match "Air Max"] {
        _id,
        name,
        currentPrice,
        discountedPrice,
        color,
        status,
        brandName,
        'image_url': image.asset->url
      }
    `;

  // Fetch data from Sanity
  const products:ProductCardTypes[] = await client.fetch(query);
 
  const sortedProducts = products
    .map((product) => ({
      ...product,
      numericId: parseInt(product._id.split('-')[1]),
    }))
    .sort((a, b) => a.numericId - b.numericId);

  return sortedProducts;
};

export const fetchProductListByMens = async () => {
  // GROQ query to fetch mens products
  const query = `
    *[_type == "product" && (category match "Mens" || category match "Men's")] {
      _id,
      name,
      currentPrice,
      discountedPrice,
      color,
      status,
      brandName,
      'image_url': image.asset->url
    }
    `;

  // Fetch data from Sanity
  const products:ProductCardTypes[] = await client.fetch(query);
 
  const sortedProducts = products
    .map((product) => ({
      ...product,
      numericId: parseInt(product._id.split('-')[1]),
    }))
    .sort((a, b) => a.numericId - b.numericId);

  return sortedProducts;
};

export const fetchProductListByWomens = async () => {
  // GROQ query to fetch womens products
  const query = `
    *[_type == "product" && (category match "Womens" || category match "Women's")] {
      _id,
      name,
      currentPrice,
      discountedPrice,
      color,
      status,
      brandName,
      'image_url': image.asset->url
    }
    `;

  // Fetch data from Sanity
  const products:ProductCardTypes[] = await client.fetch(query);
 
  const sortedProducts = products
    .map((product) => ({
      ...product,
      numericId: parseInt(product._id.split('-')[1]),
    }))
    .sort((a, b) => a.numericId - b.numericId);

  return sortedProducts;
};