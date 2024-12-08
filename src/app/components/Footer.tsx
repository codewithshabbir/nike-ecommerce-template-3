import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import twitterIcon from "@public/images/icons/twitter.svg";
import facebookIcon from "@public/images/icons/facebook.svg";
import youtubeIcon from "@public/images/icons/youtube.svg";
import instagramIcon from "@public/images/icons/instagram.svg";
import locationWhiteIcon from "@public/images/icons/location-white.svg";


const Footer = () => {
  return (
    <div className='px-10 bg-black'>
      <div className='grid grid-cols-12 py-14'>
        <div className='col-span-12 lg:col-span-6 flex flex-wrap space-x-0 md:space-x-16'>
          <ul className='w-full md:w-auto'>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>Find a store</Link></li>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>Become A Member</Link></li>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>Sign Up for Email</Link></li>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>Send Us Feedback</Link></li>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>Student Discounts</Link></li>
          </ul>
          <ul className='w-full md:w-auto'>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>Get Help</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Order Status</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Delivery</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Returns</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Payment Options</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Contact Us On Nike.com Inquiries</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Contact Us On All Other Inquiries</Link></li>
          </ul>
          <ul className='w-full md:w-auto'>
            <li><Link className='text-white text-xs leading-[50px] uppercase' href='#'>About Nike</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>News</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Careers</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Investors</Link></li>
            <li><Link className='text-text-primary-gray text-xs leading-[50px] uppercase' href='#'>Sustainability</Link></li>
          </ul>
        </div>
        <div className='col-span-12 lg:col-span-6 flex justify-end'>
          <ul className='flex space-x-4'>
            <li>
              <Link href='#'>
                <Image src={twitterIcon} alt='Twitter Icon'/>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <Image src={facebookIcon} alt='Facebook Icon'/>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <Image src={youtubeIcon} alt='Youtube Icon'/>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <Image src={instagramIcon} alt='Instagram Icon'/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='grid grid-cols-12 py-6 gap-4 lg:gap-0'>
        <div className='col-span-12 lg:col-span-6 flex'>
          <div className='flex'>
            <Image src={locationWhiteIcon} alt='Location Icon'/>
            <p className='text-white ps-4'>India</p>
          </div>
          <p className='text-text-primary-gray ps-8'>© 2023 Nike, Inc. All Rights Reserved</p>
        </div>
        <div className='col-span-12 lg:col-span-6'>
          <ul className='flex space-x-10 justify-end flex-wrap'>
            <li><Link className='text-text-primary-gray' href='#'>Guides</Link></li>
            <li><Link className='text-text-primary-gray' href='#'>Terms of Sale</Link></li>
            <li><Link className='text-text-primary-gray' href='#'>Terms of Use</Link></li>
            <li><Link className='text-text-primary-gray' href='#'>Nike Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer