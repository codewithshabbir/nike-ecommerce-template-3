import React from "react";
import logo from "@public/images/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";

const page = () => {
  return (
    <div className="flex flex-col items-center py-10 px-10 md:px-0">
      <Image className="pb-5" src={logo} width={40} height={10} alt="Logo" />
      <h2 className="uppercase w-40 text-center font-bold pb-5">
        YOUR ACCOUNT FOR EVERYTHING NIKE
      </h2>
      <form action="" className="flex flex-col w-full lg:w-96">
        <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Email Address" />
        <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Password" />
        <div className="flex justify-between items-center py-5">
          <div>
            <input type="checkbox" id="remember" />
            <label className="ml-2 pl-2 cursor-pointer text-text-secondary-gray" htmlFor="remember">
                Keep me signed in
            </label>
          </div>
          <div>
            <span>
              <a href="#" className="text-[#BCBCBC]">Forgotten your password?</a>
            </span>
          </div>
        </div>
        <p className="text-text-secondary-gray text-center pb-6">By logging in, you agree to Nike's <Link className="underline" href="#">Privacy Policy</Link> and <Link className="underline" href="#">Terms of Use</Link>.</p>
        <Button text="SIGN IN" classNames="rounded-sm py-3"/>
        <p className="text-center"> <span className="text-text-secondary-gray">Not a Member? </span><span className="underline">Join Us.</span></p>
      </form>
    </div>
  );
};

export default page;
