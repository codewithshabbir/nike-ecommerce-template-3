"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import topLogo from "@public/images/logo/favicon.svg";
import logo from "@public/images/logo/logo.svg";
import wishlistIcon from "@public/images/icons/wishlist.svg";
import cartIcon from "@public/images/icons/cart.svg";
import searchIcon from "@public/images/icons/search.svg";
import menuIcon from "@public/images/icons/menu.svg";
import crossIcon from "@public/images/icons/cross.svg";
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalStateContext";
import CartSidebar from "./CartSidebar";
import { fetchSearchProducts } from "../api/productApi";
import { SearchProducts } from "../@types/types";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, toggleAddToCartSidebar, sidebarOpen, wishlistCount } =
    useGlobalState();
  const [query, setquery] = useState("");
  const [result, setresult] = useState<SearchProducts[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (query.length < 2) {
      setresult([]);
      return;
    }
    const fetchResult = async () => {
      const productData: SearchProducts[] = await fetchSearchProducts(query);
      setresult(productData);
    };
    fetchResult();
  }, [query]);

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
            <div className="relative w-full max-w-md">
              {/* Search Bar */}
              <div className="flex px-4 py-3 rounded-full bg-light-gray border border-gray-300 focus-within:border-black">
                <Image src={searchIcon} alt="search" />
                <input
                  className="pl-4 flex-1 bg-light-gray focus:outline-none"
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                />
              </div>

              {/* Search Results Dropdown */}
              {query.length >= 2 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {result.length > 0 ? (
                    result.map((product) => (
                      <Link
                        href={`/shop/${product._id.split("-")[1]}`}
                        key={product._id}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            ${product.discountedPrice}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm text-center">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              className="relative cursor-pointer flex items-center"
              href={"/wishlist"}
            >
              <Image src={wishlistIcon} alt="wishlist" />
              <span className="absolute top-2 -right-1 bg-black text-white text-[10px] rounded-lg w-4 h-4 flex justify-center items-center">
                {wishlistCount}
              </span>
            </Link>
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
        <Link
              className="relative cursor-pointer flex items-center"
              href={"/wishlist"}
            >
              <Image src={wishlistIcon} alt="wishlist" />
              <span className="absolute top-0 -right-1 bg-black text-white text-[10px] rounded-lg w-4 h-4 flex justify-center items-center">
                {wishlistCount}
              </span>
            </Link>
          <div
              className="relative cursor-pointer flex items-center"
              onClick={() => toggleAddToCartSidebar(true)}
            >
              <Image src={cartIcon} alt="cart" />
              <span className="absolute top-0 -right-1 bg-black text-white text-[10px] rounded-lg w-4 h-4 flex justify-center items-center">
                {cartCount}
              </span>
            </div>
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
          <div className="relative w-full max-w-md">
          <div className="flex px-4 py-3 mt-6 rounded-full w-full bg-light-gray">
            <Image src={searchIcon} alt="search" />
            <input
              className="pl-4 focus-visible:outline-none w-full bg-light-gray"
              type="text"
              placeholder="Search"
              value={query}
                  onChange={(e) => setquery(e.target.value)}
            />
          </div>
            {/* Search Results Dropdown */}
            {query.length >= 2 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {result.length > 0 ? (
                    result.map((product) => (
                      <Link
                        href={`/shop/${product._id.split("-")[1]}`}
                        key={product._id}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            ${product.discountedPrice}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm text-center">
                      No products found
                    </div>
                  )}
                </div>
              )}
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
