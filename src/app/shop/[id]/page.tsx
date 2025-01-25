import { ProductListTypes } from '@/app/@types/types';
import { fetchSingleProduct } from '@/app/api/productApi';
import Button from '@/app/components/Button';
import StarRating from '@/app/components/StarRating';
import Image from 'next/image';
import Link from 'next/link';
import { TbTruckReturn } from "react-icons/tb";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const productData:ProductListTypes = await fetchSingleProduct(id);

  if (!productData) {
    return <p>Product not found!</p>;
  }

  return (
    <div className='grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-0 md:gap-10'>
      <div className='col-span-12 md:col-span-6'>
        <Image
          src={productData.image_url}
          alt={productData.name}
          width={500}
          height={500}
        />
      </div>
      <div className='col-span-12 md:col-span-6 pr-18 pt-10 md:pt-0'>
        <h3 className='font-bold text-[#9E3500]'>{productData.status}</h3>
        <h2 className='text-3xl'>{productData.name}</h2>
        <div className='flex gap-2 items-center'>
          <StarRating rating={productData.rating} /> <span>{productData.rating}</span>
        </div>
        <p className='py-4'>{productData.shortDescription}</p>
        <div>
          <span>Rs: {productData.currentPrice}</span>
          <span className='text-gray-500 line-through'>Rs: {productData.discountedPrice}</span>
        </div>
        <div className='flex my-4'>
          <Link href='/cart'>
            <Button text='Add to Cart' classNames='rounded-full py-2 text-white' />
          </Link>
        </div>
        <div>
          Tags: {productData.tags.map((tag) => (
            <span key={tag} className='bg-black text-white px-2 py-[0.5px] mx-1'>{tag}</span>
          ))}
        </div>
        <p className='py-2'>
          <span className='font-bold'>SKU:</span> {productData.sku}
        </p>
        <p className='flex gap-2'>
          <span className='text-2xl font-bold'><TbTruckReturn /></span>
          {productData.returnPolicy}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
