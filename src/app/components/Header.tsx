import Image from "next/image";
import React from "react";
import topLogo from "@public/images/logo/favicon.svg";
import logo from "@public/images/logo/logo.svg";
import wishlistIcon from "@public/images/icons/wishlist.svg";
import cartIcon from "@public/images/icons/cart.svg";
import searchIcon from "@public/images/icons/search.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-10 ">
        {/* Top Logo */}
        <Image src={topLogo} alt="Top Logo" />

        {/* Top Navigation */}
        <ul className="flex space-x-6 py-3">
          <li className="flex items-center border-r border-black pr-6">
            <Link href="/store" className="leading-[14px]">
              Find a Store
            </Link>
          </li>
          <li className="flex items-center border-r border-black pr-6">
            <Link href="/help" className="leading-[14px]">
              Help
            </Link>
          </li>
          <li className="flex items-center border-r border-black pr-6">
            <Link href="/join" className="leading-[14px]">
              Join Us
            </Link>
          </li>
          <li className="flex items-center pr-6">
            <Link href="/sign-in" className="leading-[14px]">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex px-10 justify-between items-center py-4 bg-white">
        <Image src={logo} alt="Logo"/>
        <ul className="flex space-x-6">
            <li>
                <Link href="#">New & Featured</Link>
            </li>
            <li>
                <Link href="#">Men</Link>
            </li>
            <li>
                <Link href="#">Women</Link>
            </li>
            <li>
                <Link href="#">Kids</Link>
            </li>
            <li>
                <Link href="#">Sale</Link>
            </li>
            <li>
                <Link href="#">SNKRS</Link>
            </li>
        </ul>
        <div className="flex space-x-6">
            <div className="flex px-4 py-3 rounded-full w-[64%] bg-background">
                <Image src={searchIcon} alt="wishlist"/>
                <input className="bg-background pl-4 focus-visible:outline-none w-[64%]" type="text" placeholder="Search" name="" id="" />                
            </div>
            <Image src={wishlistIcon} alt="wishlist"/>
            <Image src={cartIcon} alt="cart"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
