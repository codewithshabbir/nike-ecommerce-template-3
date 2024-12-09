'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import filterIcon from "@public/images/icons/filter.svg";
import dropdownIcon from "@public/images/icons/dropdown.svg";
import dropdownUpIcon from "@public/images/icons/dropdown-up.svg";
import ProductList from '../components/ProductList';
import Link from 'next/link';

const Page = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div className="grid grid-cols-12 px-4 md:px-10 py-20 relative">
      <div
        className={`col-span-3 pr-4 md:pr-20 bg-white z-10 transform ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static p-10 lg:p-0 w-full lg:w-60 fixed top-0 left-0 h-full overflow-y-auto transition-transform duration-300`}
      >
        <button
          className="block lg:hidden absolute top-4 right-4 text-lg"
          onClick={() => setIsSidebarVisible(false)}
        >
          ✕ Hide Filters
        </button>
        <h3 className="text-2xl">New (500)</h3>
        <ul className="mt-4">
          <li className="leading-8">
            <Link href="#">Shoes</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Sports Bras</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Tops & T-Shirts</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Hoodies & Sweatshirts</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Jackets</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Trousers & Tights</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Shorts</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Tracksuits</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Jumpsuits & Rompers</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Skirts & Dresses</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Socks</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Accessories & Equipment</Link>
          </li>
        </ul>
        <div className="my-10 border-t-2 pt-4">
          <div className="flex justify-between pb-4">
            <p>Gender</p>
            <Image src={dropdownUpIcon} alt="Drop Down Up" />
          </div>
          <div>
            <input type="checkbox" id="men" />
            <label className="pl-2 cursor-pointer" htmlFor="men">
              Men
            </label>
          </div>
          <div>
            <input type="checkbox" id="women" />
            <label className="pl-2 cursor-pointer" htmlFor="women">
              Women
            </label>
          </div>
          <div>
            <input type="checkbox" id="unisex" />
            <label className="pl-2 cursor-pointer" htmlFor="unisex">
              Unisex
            </label>
          </div>
        </div>
        <div className="my-10 border-t-2 pt-4">
          <div className="flex justify-between pb-4">
            <p>Shop By Price</p>
            <Image src={dropdownUpIcon} alt="Drop Down Up" />
          </div>
          <div>
            <input type="checkbox" id="under-2500" />
            <label className="pl-2 cursor-pointer" htmlFor="under-2500">
              Under ₹ 2,500.00
            </label>
          </div>
          <div>
            <input type="checkbox" id="2500-7500" />
            <label className="pl-2 cursor-pointer" htmlFor="2500-7500">
              ₹ 2,501.00 - ₹ 7,500.00
            </label>
          </div>
        </div>
      </div>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarVisible(false)}
        ></div>
      )}

      <div className="col-span-12 lg:col-span-9">
        <div className="flex justify-between lg:justify-end gap-10 mb-8">
          <button
            className="flex items-center lg:hidden"
            onClick={() => setIsSidebarVisible(true)}
          >
            Show Filters <Image className="ms-2" src={filterIcon} alt="Filter" />
          </button>
          <button
            className="hidden lg:flex"
          >
            Hide Filters <Image className="ms-2" src={filterIcon} alt="Filter" />
          </button>
          <div className="flex items-center">
            Sort By <Image className="ms-2" src={dropdownIcon} alt="Dropdown" />
          </div>
        </div>
        <ProductList />
        <div>
          <h3 className="mt-12 font-bold">Related Categories</h3>
          <ul className="flex gap-x-4 gap-y-2 flex-wrap mt-4">
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">Best Selling Products</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">Best Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">New Basketball Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">New Football Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">New Men's Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">New Running Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">Best Men's Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">New Jordan Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">Best Women's Shoes</Link>
            </li>
            <li className="border-[1px] rounded-full px-6 py-[0.5px]">
              <Link href="#">Best Training & Gym</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;