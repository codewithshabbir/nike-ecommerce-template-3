import { client } from "@/sanity/lib/client";
import { ProductCardTypes } from "../@types/types";

// Helper function to sort products by numeric ID
const sortProductsById = (products: ProductCardTypes[]) => {
  return products
    .map((product) => ({
      ...product,
      numericId: parseInt(product._id.split("-")[1]),
    }))
    .sort((a, b) => a.numericId - b.numericId);
};

export const fetchProductList = async () => {
  try {
    // GROQ query to fetch all products
    const query = `
  *[_type == "product"] {
    _id,
    name,
    currentPrice,
    discountedPrice,
    color,
    category,
    status,
    brandName,
    shortDescription,
    'image_url': image.asset->url
  }`;

    // Fetch data from Sanity
    const products: ProductCardTypes[] = await client.fetch(query);

    const sortedProducts = products
      .map((product) => ({
        ...product,
        numericId: parseInt(product._id.split("-")[1]),
      }))
      .sort((a, b) => a.numericId - b.numericId);

    return sortedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchSingleProduct = async (id: string) => {
  try {
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
  } catch (error) {
    console.error("Error fetching Single products:", error);
    return [];
  }
};

export const fetchProductListByAirMax = async () => {
  try {
    // GROQ query to fetch Air Max products
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
    const products: ProductCardTypes[] = await client.fetch(query);

    return sortProductsById(products);
  } catch (error) {
    console.error("Error fetching Air Max products:", error);
    return [];
  }
};

export const fetchProductListByMens = async () => {
  try {
    // GROQ query to fetch men's products
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
    const products: ProductCardTypes[] = await client.fetch(query);

    return sortProductsById(products);
  } catch (error) {
    console.error("Error fetching Men's products:", error);
    return [];
  }
};

export const fetchProductListByWomens = async () => {
  try {
    // GROQ query to fetch women's products
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
    const products: ProductCardTypes[] = await client.fetch(query);

    return sortProductsById(products);
  } catch (error) {
    console.error("Error fetching Women's products:", error);
    return [];
  }
};

export const fetchProductsCategory = async () => {
  try {
    const productsData = await fetchProductList();
    const categories = productsData.map((product) => product.category);
    const uniqueCategory = [...new Set(categories)];
    return uniqueCategory;    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return undefined;
  }
}

export const fetchProductsCategoryByGender = async () => {
  try {
    const productCategory = await fetchProductsCategory();
    const productCategoryByGender = productCategory?.filter((item) =>
      item?.includes("Men") || 
      item?.includes("Women") || 
      item?.includes("Kids") || 
      item?.includes("Baby/Toddler")
    );
    return productCategoryByGender;
  } catch (error) {
    console.error('Error fetching categories by gender:', error)
    return undefined;
  }
}