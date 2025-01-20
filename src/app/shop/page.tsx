"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import filterIcon from "@public/images/icons/filter.svg";
import dropdownIcon from "@public/images/icons/dropdown.svg";
import ProductList from "../components/ProductList";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchProductsCategory } from "../api/productApi";

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-6 bg-gray-300 animate-pulse rounded-md"
        ></div>
      ))}
    </div>
  );
};

const Page = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "item-1", // Default open item
    "item-2", // Default open item
    "item-3", // Default open item
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCategories = async () => {
      const productCategories = await fetchProductsCategory();
      const validCategories =
        productCategories?.filter((category): category is string => category !== undefined) || [];
      setCategories(validCategories);
      setLoading(false); // Set loading to false after categories are fetched
    };
    getCategories();
  }, []);

  const toggleAccordion = (value: string) => {
    setOpenAccordions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="grid grid-cols-12 px-4 md:px-10 py-20 relative">
      <div
        className={`col-span-3 pr-4 md:pr-20 bg-white z-10 transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static p-10 lg:p-0 w-full lg:w-60 fixed top-0 left-0 h-full overflow-y-auto transition-transform duration-300`}
      >
        <button
          className="block lg:hidden absolute top-4 right-4 text-lg"
          onClick={() => setIsSidebarVisible(false)}
        >
          ✕ Hide Filters
        </button>

        {/* Set default open accordions */}
        <Accordion type="multiple" value={openAccordions}>
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="hover:no-underline"
              onClick={() => toggleAccordion("item-1")}
            >
              Categories
            </AccordionTrigger>
            <AccordionContent>
              {loading ? (
                <SkeletonLoader /> // Show skeleton loader while loading categories
              ) : (
                <ul>
                  {categories.map((category) => (
                    <li key={category}>
                      <input type="checkbox" id={category.toLowerCase()} />
                      <label className="pl-2 cursor-pointer" htmlFor={category.toLowerCase()}>
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger
              className="hover:no-underline"
              onClick={() => toggleAccordion("item-2")}
            >
              Gender
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <input type="checkbox" id="men" />
                <label className="pl-2 cursor-pointer" htmlFor="men">Men</label>
              </div>
              <div>
                <input type="checkbox" id="women" />
                <label className="pl-2 cursor-pointer" htmlFor="women">Women</label>
              </div>
              <div>
                <input type="checkbox" id="unisex" />
                <label className="pl-2 cursor-pointer" htmlFor="unisex">Unisex</label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger
              className="hover:no-underline"
              onClick={() => toggleAccordion("item-3")}
            >
              Shop By Price
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <input type="checkbox" id="under-2500" />
                <label className="pl-2 cursor-pointer" htmlFor="under-2500">Under ₹ 2,500.00</label>
              </div>
              <div>
                <input type="checkbox" id="2500-7500" />
                <label className="pl-2 cursor-pointer" htmlFor="2500-7500">₹ 2,501.00 - ₹ 7,500.00</label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
            Show Filters{" "}
            <Image className="ms-2" src={filterIcon} alt="Filter" />
          </button>
          <button className="hidden lg:flex">
            Hide Filters{" "}
            <Image className="ms-2" src={filterIcon} alt="Filter" />
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