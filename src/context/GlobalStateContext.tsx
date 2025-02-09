'use client'
import { GlobalStateContextType, ProductCardTypes } from "@/app/@types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// GlobalStateProvider Component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductCardTypes[]>([]);
  const [wishlist, setWishlist] = useState<ProductCardTypes[]>([]);
  const [sidebarOpen, setsidebarOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [wishlist]);

  // Toggle cart sidebar
  const toggleAddToCartSidebar = (isOpen: boolean) => {
    setsidebarOpen(isOpen);
  };

  // Add to Cart with Quantity Update
  const addToCart = (item: ProductCardTypes) => {
    setCart((prevCart) => {
      if (prevCart.some((cartItem) => cartItem._id === item._id)) {
        return prevCart;
      }
      return [...prevCart, item];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  // Toggle Wishlist Function (Add/Remove)
  const addToWishlist = (item: ProductCardTypes) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((wishlistItem) => wishlistItem._id === item._id);
      return isAlreadyInWishlist ? prevWishlist.filter((wishlistItem) => wishlistItem._id !== item._id) : [...prevWishlist, item];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (itemId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== itemId));
  };

  return (
    <GlobalStateContext.Provider
      value={{
        cart,
        wishlist,
        cartCount: cart.length,
        wishlistCount: wishlist.length,
        sidebarOpen,
        toggleAddToCartSidebar,
        addToCart,
        removeFromCart,
        clearCart,
        clearWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom Hook to access Global State Context
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};