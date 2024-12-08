import Image from "next/image";
import Link from "next/link";
import nikeBanner from "@public/images/nike-banner.jpg";
import featureBanner from "@public/images/featured-banner.jpg";
import dontMissBanner from "@public/images/dont-miss-banner.jpg";
import mensThumbnail from "@public/images/categories-thumbnail/mens-thumbnail.jpg";
import womensThumbnail from "@public/images/categories-thumbnail/womens-thumbnail.jpg";
import kidsThumbnail from "@public/images/categories-thumbnail/kids-thumbnail.jpg";
import Button from "./components/Button";
import BannerSection from "./components/BannerSection";
import ProductSlider from "./components/ProductSlider";
import ShopMensSlider from "./components/ShopMensSlider";
import ShopWomensSlider from "./components/ShopWomensSlider";

export default function Home() {
  return (
    <>
      <div className="flex items-center flex-col bg-light-gray py-2 px-10 md:px-0">
        <h2>Hello Nike App</h2>
        <p>
          Download the app to access everything Nike.
          <Link href="#">Get Your Great</Link>
        </p>
      </div>
      <section className="px-10">
        <Image src={nikeBanner} alt="" />
        <div className="flex flex-col items-center py-10">
          <h3>First Look</h3>
          <h2 className="text-5xl uppercase pt-2 text-center">Nike Air Max Pulse</h2>
          <p className="w-full md:w-1/2 text-center py-6">
            Extreme comfort. Hyper durable. Max volume. Introducing the Air Max
            Pulse —designed to push you past your limits and help you go to the
            max.
          </p>
          <div className='flex gap-2'>
              <Button text="Notify Me" classNames="rounded-full py-2"/>
              <Button text="Shop Air Max" classNames="rounded-full py-2"/>
          </div>
        </div>
      </section>
      <section className="px-10">
          <ProductSlider/>
      </section>
      <BannerSection heading="Featured" imageUrl={featureBanner} imageAlt="Feature Banner" secondHeading="STEP INTO WHAT FEELS GOOD" para="Cause everyone should know the feeling of running in that perfect pair." buttonText="Find Your Shoe"/>
      <section className="px-10">
        <h2 className="font-bold">Gear Up</h2>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <ShopMensSlider/>
          </div>
          <div className="col-span-12 md:col-span-6">
            <ShopWomensSlider/>
          </div>
        </div>
      </section>
      <BannerSection heading="Don't Miss" imageUrl={dontMissBanner} imageAlt="Dont Miss Banner" secondHeading="FLIGHT ESSENTIALS" para="Your built-to-last, all-week wears—but with style only Jordan Brand can deliver." buttonText="Shop"/>
      <section className="px-10">
        <h2 className="mb-4 font-bold">The Essentials</h2>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 m-auto relative">
            <Image src={mensThumbnail} alt="Mens Thumbnail"/>
            <div className="absolute bottom-10 left-8">
              <button className="bg-white px-6 py-2 rounded-full">Men's</button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 m-auto relative">
            <Image src={womensThumbnail} alt="Womens Thumbnail"/>
            <div className="absolute bottom-10 left-8">
              <button className="bg-white px-6 py-2 rounded-full">Women's</button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 m-auto relative">
            <Image src={kidsThumbnail} alt="Kids Thumbnail"/>
            <div className="absolute bottom-10 left-8">
              <button className="bg-white px-6 py-2 rounded-full">Kid's</button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 px-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-0 lg:px-20">
              {/* Icons */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Icons</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-text-primary-gray">Air Force 1</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Huarache</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Air Max 90</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Air Max 95</Link></li>
                </ul>
              </div>

              {/* Shoes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shoes</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-text-primary-gray">All Shoes</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Custom Shoes</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Jordan Shoes</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Running Shoes</Link></li>
                </ul>
              </div>

              {/* Clothing */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Clothing</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-text-primary-gray">All Clothing</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Modest Wear</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Hoodies & Pullovers</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Shirts & Tops</Link></li>
                </ul>
              </div>

              {/* Kids */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Kids'</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-text-primary-gray">Infant & Toddler Shoes</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Kids' Shoes</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Kids' Jordan Shoes</Link></li>
                  <li><Link href="#" className="text-text-primary-gray">Kids' Basketball Shoes</Link></li>
                </ul>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
