"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import filterIcon from "@public/images/icons/filter.svg";
import dropdownIcon from "@public/images/icons/dropdown.svg";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchProductList, fetchProductsCategory } from "../api/productApi";
import { ProductCardTypes } from "../@types/types";
import Card from "../components/Cards/Card";
import { ToastContainer, Bounce } from 'react-toastify';


// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="h-6 bg-gray-300 animate-pulse rounded-md"></div>
    ))}
  </div>
);

// Skeleton Loader Component for Products
const ProductSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pb-10 border-b-2">
    {[...Array(9)].map((_, index) => (
      <div key={index} className="p-4">
        <div className="bg-gray-300 animate-pulse h-60 mb-4 rounded-md"></div>
        <div className="h-4 bg-gray-300 animate-pulse w-3/4 mb-2 rounded-md"></div>
        <div className="h-4 bg-gray-300 animate-pulse w-1/2 mb-2 rounded-md"></div>
        <div className="h-4 bg-gray-300 animate-pulse w-1/4 rounded-md"></div>
      </div>
    ))}
  </div>
);

const Page = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [openAccordions, setOpenAccordions] = useState<string[]>(["category-accordian", "gender-accordian", "price-accordian"]);
  const [allProducts, setAllProducts] = useState<ProductCardTypes[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardTypes[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all products
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const products = await fetchProductList();
      setAllProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    };
    getProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const productCategories = await fetchProductsCategory();
      const validCategories = productCategories?.filter((category): category is string => category !== undefined) || [];
      setCategories(validCategories);
      setLoading(false);
    };
    getCategories();
  }, []);

  // Filter products based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        selectedCategories.includes(product.category?.toLowerCase() || "")
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategories, allProducts]);

  // Handle category selection and deselection
  const handleCategoryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedCategories((prevSelectedCategories) => {
      if (checked) {
        return [...prevSelectedCategories, value.toLowerCase()];
      } else {
        return prevSelectedCategories.filter((category) => category !== value.toLowerCase());
      }
    });
    setIsSidebarVisible(false)
  };

  // Toggle accordions
  const toggleAccordion = (value: string) => {
    setOpenAccordions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="grid grid-cols-12 px-4 md:px-10 py-10 relative">
      {/* Sidebar */}
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

        <Accordion type="multiple" value={openAccordions}>
          {/* Categories */}
          <AccordionItem value="category-accordian">
            <AccordionTrigger onClick={() => toggleAccordion("category-accordian")}>Categories</AccordionTrigger>
            <AccordionContent>
              {loading ? (
                <SkeletonLoader />
              ) : (
                <ul>
                  {categories.map((category) => (
                    <li key={category}>
                      <input
                        type="checkbox"
                        value={category.toLowerCase()}
                        id={category.toLowerCase()}
                        onChange={handleCategoryFilter}
                      />
                      <label className="pl-2 cursor-pointer" htmlFor={category.toLowerCase()}>
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gender-accordian">
            <AccordionTrigger onClick={() => toggleAccordion("gender-accordian")}>
              Gender
            </AccordionTrigger>
            <AccordionContent>
              {/* Gender filters */}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price-accordian">
            <AccordionTrigger
              className="hover:no-underline"
              onClick={() => toggleAccordion("price-accordian")}
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

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9">
        <div className="flex justify-between lg:justify-end gap-10 mb-8">
          <button
            className="flex items-center lg:hidden"
            onClick={() => setIsSidebarVisible(true)}
          >
            Show Filters <Image className="ms-2" src={filterIcon} alt="Filter" />
          </button>
          <div className="flex items-center">
            Sort By <Image className="ms-2" src={dropdownIcon} alt="Dropdown" />
          </div>
        </div>
        <div>
          {loading ? (
            <ProductSkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 border-b-2 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id.split("-")[1]}
                  _id={product._id.split("-")[1]}
                  status={product.status}
                  name={product.name}
                  color={product.color}
                  currentPrice={product.currentPrice}
                  discountedPrice={product.discountedPrice}
                  shortDescription={product.shortDescription}
                  image_url={product.image_url}
                />
              ))}
            </div>
          )}
        </div>

      
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          />

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