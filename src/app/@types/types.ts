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
  shortDescription: string,
  name: string;
  color: string;
  category? : string;
  image_url: string;
};

export interface ButtonProps {
  text: string;
  classNames: string;
  clickFun?: () => void;
  link?: string;
}

export interface StarRatingProps {
  rating: number;
}

export interface cartSidebarProps {
  onClickFun: (value: boolean) => void;
  value: boolean;
}

// Combined Global State Context
export type GlobalStateContextType = {
  cart: ProductCardTypes[];
  wishlist: ProductCardTypes[];
  cartCount: number;
  wishlistCount: number;
  sidebarOpen: boolean;
  toggleAddToCartSidebar: (isOpen: boolean) => void;
  addToCart: (item: ProductCardTypes) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  addToWishlist: (item: ProductCardTypes) => void;
  removeFromWishlist: (itemId: string) => void;
};

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  addressTwo: string;
  city: string;
  postalCode: string;
  country: string;
  number: string;
}

export interface Order {
  _type: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  transactionId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
  orderSummary: {
    product: { _type: string; _ref: string };
    name: string;
    image_url: string;
    price: number;
    discount_price: number;
  }[];
}