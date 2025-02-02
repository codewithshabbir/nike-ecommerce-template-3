'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import deliverIcon from "@public/images/icons/deliver.svg";
import { fetchCountries, fetchProductList } from '../api/productApi';
import { useCart } from '@/context/CartContext';
import { Country, FormData, ProductCardTypes } from '../@types/types';
import { client } from '@/sanity/lib/client';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 

const page = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        addressTwo: '',
        city: '',
        postalCode: '',
        country: '',
        number: '',
    });
    const { cart } = useCart();
    const [countries, setCountries] = useState<Country[]>([]);
    const [product, setproduct] = useState<ProductCardTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [productLoading, setproductLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchLatestProducts = async () =>{
        try {
            const productsData = await fetchProductList();
            setproduct(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setproductLoading(false)
        }
      }
      fetchLatestProducts();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); 
        const orderData = {
            _type: 'order',
            ...formData,
            totalPrice: cart.reduce((acc, val) => Number(acc) + Number(val.discountedPrice), 0),
            orderSummary: cart.map((product) => ({
                _type: 'reference',
                _ref: 'product-'+product._id
            })),
            status: 'pending',
            createdAt: new Date().toISOString(),
        }
        const submitOrder = async () => {
            try {
                const response = await client.create(orderData);
                console.log("Order created:", response);
                setFormData({
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    addressTwo: '',
                    city: '',
                    postalCode: '',
                    country: '',
                    number: '',
                });
                toast.success(`Order created successfully!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            } catch (error) {
                console.error("Error creating order:", error);
                toast.error("Error creating order. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            }finally {
                setLoading(false);
            }
        }
        submitOrder();
        console.log("Form data submitted:", formData);
    };

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await fetchCountries();
                const countryData = await response?.json();
                setCountries(countryData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        getCountries();
    }, []);

    return (
        <div className='grid grid-cols-12 gap-8 px-6 lg:px-20 my-10'>
            {/* Left Column - Delivery and Address Form */}
            <div className='col-span-12 lg:col-span-8'>
                <h2 className='font-bold text-2xl mb-6'>How would you like to get your order?</h2>
                <p className='text-gray-600 mb-8'>
                    Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <span className='underline text-blue-600 cursor-pointer'>Learn More</span>
                </p>

                <div className='flex items-center border-2 border-black rounded-lg p-4 mb-8'>
                    <Image src={deliverIcon} alt='Deliver Icon' className='w-6 h-6' />
                    <span className='ml-4 text-lg'>Deliver It</span>
                </div>

                <h2 className='font-bold text-2xl mb-6'>Enter your name and address:</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <input
                        value={formData.email}
                        onChange={handleChange}
                        name='email'
                        className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                        type='email'
                        placeholder='Email Address'
                    />
                    <div className='flex gap-4'>
                        <input
                            value={formData.firstName}
                            onChange={handleChange}
                            name='firstName'
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                            type='text'
                            placeholder='First Name'
                        />
                        <input
                            value={formData.lastName}
                            onChange={handleChange}
                            name='lastName'
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                            type='text'
                            placeholder='Last Name'
                        />
                    </div>
                    <input
                        value={formData.address}
                        onChange={handleChange}
                        name='address'
                        className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                        type='text'
                        placeholder='Address'
                    />
                    <input
                        value={formData.addressTwo}
                        onChange={handleChange}
                        name='addressTwo'
                        className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                        type='text'
                        placeholder='Add Company, C/O, Apt, Suite, Unit'
                    />
                    <div className='flex gap-4'>
                        <input
                            value={formData.city}
                            onChange={handleChange}
                            name='city'
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                            type='text'
                            placeholder='Town/City'
                        />
                        <input
                            value={formData.postalCode}
                            onChange={handleChange}
                            name='postalCode'
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                            type='text'
                            placeholder='Postal Code'
                        />
                        <select
                            value={formData.country}
                            onChange={handleChange}
                            name='country'
                            className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                        >
                            <option value='' disabled>Country/Region</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        value={formData.number}
                        onChange={handleChange}
                        name='number'
                        className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black'
                        type='text'
                        placeholder='Phone Number'
                    />
                    <button
                        type='submit'
                        className='w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300'
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                        ) : (
                            'Save & Continue'
                        )}
                    </button>
                </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className='col-span-12 lg:col-span-4 bg-gray-50 p-6 rounded-lg'>
                <h2 className='text-2xl font-bold mb-6'>Order Summary</h2>
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Subtotal</span>
                        <span className='font-semibold'>Rs &nbsp;
                            {cart.reduce((acc, val) => Number(acc) + Number(val.discountedPrice), 0)}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Delivery/Shipping</span>
                        <span className='font-semibold'>Free</span>
                    </div>
                    <hr className='border-gray-300' />
                    <div className='flex justify-between'>
                        <span className='text-lg font-bold'>Total</span>
                        <span className='font-semibold'>Rs &nbsp;
                            {cart.reduce((acc, val) => Number(acc) + Number(val.discountedPrice), 0)}
                        </span>
                    </div>
                    <p className='text-sm text-gray-500'>
                        (The total reflects the price of your order, including all duties and taxes)
                    </p>
                </div>

                <h2 className='text-xl font-bold mt-8 mb-4'>New Arrivals</h2>
                <div className='space-y-6'>
                {productLoading ? (
                        // ✅ Skeleton Loader
                        Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className='flex flex-col gap-4 animate-pulse'>
                                <div className='bg-gray-300 rounded-md w-full h-[300px]' />
                                <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                                <div className='h-4 bg-gray-300 rounded w-1/2'></div>
                                <div className='h-3 bg-gray-300 rounded w-1/4'></div>
                            </div>
                        ))
                    ) : (
                        // ✅ Render Actual Products
                        product.slice(0, 2).map((product) => (
                            <div key={product._id} className='flex flex-col gap-4'>
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    className='w-full h-auto object-cover rounded-md'
                                    width={200}
                                    height={200}
                                />
                                <div>
                                    <h3 className='text-lg font-medium'>{product.name}</h3>
                                    <p className='text-sm text-gray-600'>{product.shortDescription}</p>
                                    <div className='flex gap-4 text-sm text-gray-600 mt-1'>
                                        {product.discountedPrice && (
                                            <p className="font-medium text-gray-800">Rs: {product.discountedPrice}</p>
                                        )}
                                        {product.currentPrice && product.discountedPrice !== product.currentPrice && (
                                            <p className="font-medium text-gray-600 line-through">Rs: {product.currentPrice}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default page;