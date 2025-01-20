export interface ProductListTypes {
  _id: string;
  numericId: number;
  name: string;
  brandName: string;
  category: string;
  color: string;
  colors: string[];
  currentPrice: number;
  description: string;
  discountedPrice: number;
  image_url: string;
  inventory: number;
  rating: number;
  returnPolicy: string;
  shortDescription: string;
  sku: string;
  status: string;
  tags: string[];
}

export interface ProductCardTypes {
  _id:string;
  status: string;
  currentPrice: number,
  discountedPrice: number,
  name: string;
  color: string;
  category? : string;
  image_url: string;
};

export interface StarRatingProps {
  rating: number;
}