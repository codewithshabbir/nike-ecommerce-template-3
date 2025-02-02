'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import deliverIcon from "@public/images/icons/deliver.svg";
import product38 from '@public/images/products/product-38.png';
import product67 from '@public/images/products/product-67.png';
import Button from '../components/Button';
import { fetchCountries } from '../api/productApi';

const page = () => {
    const [countries, setcountries] = useState()

    useEffect(() => {
      const getCountries = async () => {
        try {
            const resposne = await fetchCountries();
            const country = await resposne?.json();
            setcountries(country);    
        } catch (error) {
         console.error("Error fetching countries:", error)   
        }
      }
      getCountries();
    }, [])
    console.log(countries);
    
  return (
    <div className='grid grid-cols-12 px-10 my-10 lg:px-32 lg:gap-20'>
        <div className='col-span-12 lg:col-span-8'>
            <h2 className='font-bold text-xl pb-4'>How would you like to get your order?</h2>
            <p>Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <span className='underline'>Learn More</span></p>
            <div className='flex border-[1.5px] border-black px-4 py-4  rounded-lg my-10'>
                <Image src={deliverIcon} alt='Deliver Icon'/>
                <span className='ps-6'>Deliver It</span>
            </div>
            <h2 className='font-bold text-xl pb-4'>Enter your name and address:</h2>
            <form action="">
                <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="email" placeholder="Email Address" />
                <div className='flex gap-4'>
                    <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="First Name" />
                    <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Last Name" />
                </div>
                <input className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Address" />
                <input className="w-full border-[#E5E5E5] rounded-md my-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Add Company, C/O, Apt, Suite, Unit" />
                <div className='flex gap-4'>
                    <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="City" />
                    <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="State" />
                    <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Postal Code" />    
                </div>
                <input className="w-full border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Phone Number" />
                <Button text="Save & Continue"
                    classNames="rounded-md py-4 uppercase text-md text-white block"
                />
            </form>
        </div>
        <div className='col-span-12 lg:col-span-4 mt-10 lg:mt-0'>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>      
            <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹ 20 890.00</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
                <span>Delivery/Shipping</span>
                <span>Free</span>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-between text-gray-900 font-semibold text-lg mb-2">
                <span>Total</span>
                <span>₹ 20 890.00</span>
            </div>
            <hr className="border-gray-300 my-4" />
            <p className="text-xs text-gray-500">
                (The total reflects the price of your order, including all duties and taxes)
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6">Arrives Mon, 27 Mar - Wed, 12 Apr</h2>
            <div>
                <Image src={product38} alt="Nike Dri-FIT ADV TechKnit Ultra"
                    className="mt-4 object-cover rounded-md"/>
                <div>
                <h3 className="text-lg font-medium mt-2">
                    Nike Dri-FIT ADV TechKnit Ultra
                </h3>
                <p className="text-sm text-gray-600">
                    Men's Short-Sleeve Running Top
                </p>
                <p className="text-sm text-gray-600">
                    Ashen Slate/Cobalt Bliss
                </p>
                <div className="flex gap-20 text-sm text-gray-600 mt-2">
                    <p>Size: L</p>
                    <p>Quantity: 1</p>
                </div>
                <p className='text-gray-600 mt-2'>₹ 3 895.00</p>
                </div>
            </div>
            <div>
                <Image src={product67} alt="Nike Dri-FIT ADV TechKnit Ultra"
                    className="mt-4 object-cover rounded-md"/>
                <div>
                <h3 className="text-lg font-medium mt-2">
                    Nike Dri-FIT ADV TechKnit Ultra
                </h3>
                <p className="text-sm text-gray-600">
                    Men's Short-Sleeve Running Top
                </p>
                <p className="text-sm text-gray-600">
                    Ashen Slate/Cobalt Bliss
                </p>
                <div className="flex gap-20 text-sm text-gray-600 mt-2">
                    <p>Size: L</p>
                    <p>Quantity: 1</p>
                </div>
                <p className='text-gray-600 mt-2'>₹ 3 895.00</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page