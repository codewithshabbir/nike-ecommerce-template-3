'use client'
import { CartContextType, ProductCardTypes, ProductListTypes } from "@/app/@types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context to manage the cart state
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap children and provide cart functionality
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductCardTypes[]>([]); // State to hold cart items
  const [sidebarOpen, setsidebarOpen] = useState(false);

  // Toggle cart sidebar visibility
  const toggleAddToCartSidebar = (isOpen: boolean) => {
    setsidebarOpen(isOpen);
  };

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Parse and set cart data
    }
  }, []);

  // Store updated cart data in localStorage whenever cart changes
  useEffect(() => {
    if (cart.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Function to add an item to the cart
  const addToCart = (item: ProductCardTypes) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== itemId);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount: cart.length, sidebarOpen, toggleAddToCartSidebar, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  const context = useContext(CartContext); // Access context value
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};