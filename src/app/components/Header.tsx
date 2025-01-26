"use client";
import Image from "next/image";
import React, { useState } from "react";
import topLogo from "@public/images/logo/favicon.svg";
import logo from "@public/images/logo/logo.svg";
import wishlistIcon from "@public/images/icons/wishlist.svg";
import cartIcon from "@public/images/icons/cart.svg";
import searchIcon from "@public/images/icons/search.svg";
import menuIcon from "@public/images/icons/menu.svg";
import crossIcon from "@public/images/icons/cross.svg";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartSidebar from "./CartSidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cartCount, toggleAddToCartSidebar, sidebarOpen } = useCart(); // Get cart item count from context

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div>
      <div className="hidden lg:block">
        <div className="flex justify-between items-center px-10 bg-light-gray">
          <Image src={topLogo} alt="Top Logo" />

          <ul className="flex space-x-6 py-3">
            <li className="flex items-center border-r border-black pr-6">
              <Link href="#" className="leading-[14px]">
                Find a Store
              </Link>
            </li>
            <li className="flex items-center border-r border-black pr-6">
              <Link href="/contact-us" className="leading-[14px]">
                Help
              </Link>
            </li>
            <li className="flex items-center border-r border-black pr-6">
              <Link href="/join-us" className="leading-[14px]">
                Join Us
              </Link>
            </li>
            <li className="flex items-center pr-6">
              <Link href="/login" className="leading-[14px]">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex px-10 justify-between items-center py-4">
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link href="/shop">New & Featured</Link>
            </li>
            <li>
              <Link href="/shop">Men</Link>
            </li>
            <li>
              <Link href="/shop">Women</Link>
            </li>
            <li>
              <Link href="/shop">Kids</Link>
            </li>
            <li>
              <Link href="/shop">Sale</Link>
            </li>
            <li>
              <Link href="/shop">SNKRS</Link>
            </li>
          </ul>
          <div className="flex space-x-6">
            <div className="flex px-4 py-3 rounded-full w-[64%] bg-light-gray">
              <Image src={searchIcon} alt="search" />
              <input
                className="pl-4 focus-visible:outline-none w-[64%] bg-light-gray"
                type="text"
                placeholder="Search"
              />
            </div>
            <Image src={wishlistIcon} alt="wishlist" />
            <div
              className="relative cursor-pointer flex items-center"
              onClick={() => toggleAddToCartSidebar(true)}
            >
              <Image src={cartIcon} alt="cart" />
              <span className="absolute top-2 -right-1 bg-black text-white text-[10px] rounded-lg w-4 h-4 flex justify-center items-center">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-10 py-4 flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" />
        </Link>
        <div className="flex gap-6">
          <Image src={wishlistIcon} alt="wishlist" />
          <Image src={cartIcon} alt="cart" />
          <Link href="#" onClick={toggleMenu}>
            <Image src={menuIcon} width={30} height={30} alt="Menu" />
          </Link>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white z-10 
        transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <CartSidebar onClickFun={toggleAddToCartSidebar} value={false} />
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`bg-white w-3/4 h-full p-6 transition-transform duration-300 ease-in-out transform  overflow-y-scroll ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <Image src={logo} alt="Logo" />
            <Link href="#" onClick={toggleMenu}>
              <Image src={crossIcon} width={30} height={30} alt="Close" />
            </Link>
          </div>
          <div className="flex px-4 py-3 mt-6 rounded-full w-[96%] bg-light-gray">
            <Image src={searchIcon} alt="search" />
            <input
              className="pl-4 focus-visible:outline-none w-[64%] bg-light-gray"
              type="text"
              placeholder="Search"
            />
          </div>
          <ul className="space-y-6 mt-6">
            <li>
              <Link href="/shop" onClick={toggleMenu}>
                New & Featured
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={toggleMenu}>
                Men
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={toggleMenu}>
                Women
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={toggleMenu}>
                Kids
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={toggleMenu}>
                Sale
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={toggleMenu}>
                SNKRS
              </Link>
            </li>

            <li className="border-t-2 pt-6">
              <Link href="#" onClick={toggleMenu}>
                Find a Store
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={toggleMenu}>
                Help
              </Link>
            </li>
            <li>
              <Link href="/join-us" onClick={toggleMenu}>
                Join Us
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={toggleMenu}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
