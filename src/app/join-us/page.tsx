import React from 'react';
import logo from "@public/images/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";

const page = () => {
  return (
    <div className="flex flex-col items-center py-10 px-10 md:px-0">
    <Image className="pb-5" src={logo} width={40} height={10} alt="Logo" />
    <h2 className="uppercase text-center font-bold pb-5">
      BECOME A NIKE MEMBER
    </h2>
    <p className='w-80 text-center text-text-secondary-gray pb-5'>Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
    <form action="" className="flex flex-col w-full lg:w-96">
      <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Email Address" />
      <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Password" />
      <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="First Name" />
      <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Last Name" />
      <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-2 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Date of Birth" />
      <p className='pb-3 text-text-secondary-gray text-sm text-center'>Get a Nike Member Reward every year on your Birthday.</p>
      <select className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-2 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" name="" id="">
        <option className='text-text-secondary-gray' value="">India</option>
        <option className='text-text-secondary-gray' value="">United States</option>
        <option className='text-text-secondary-gray' value="">United Kingdom</option>
        <option className='text-text-secondary-gray' value="">Pakistan</option>
        <option className='text-text-secondary-gray' value="">Canada</option>
      </select>
      <div className='flex gap-5 mt-1'>
        <div className='border-[#E5E5E5] rounded-md py-4 border-[2px] w-2/4 text-center text-text-secondary-gray'>Male</div>
        <div className='border-[#E5E5E5] rounded-md py-4 border-[2px] w-2/4 text-center text-text-secondary-gray'>Female</div>
      </div>
      <div className="flex justify-between items-center py-7">
        <div>
          <input type="checkbox" id="remember" />
          <label className="ml-2 pl-2 cursor-pointer text-text-secondary-gray" htmlFor="remember">
            Sign up for emails to get updates from Nike on products, offers and your Member benefits
          </label>
        </div>
      </div>
      <p className="text-text-secondary-gray text-center pb-6">By creating an account, you agree to Nike's <Link className="underline" href="#">Privacy Policy</Link> and <Link className="underline" href="#">Terms of Use</Link>.</p>
      <Button text="JOIN US" classNames="rounded-sm py-3"/>
      <p className="text-center"> <span className="text-text-secondary-gray">Already a Member? </span><span className="underline">Join Us.</span></p>
    </form>
  </div>
  )
}

export default page