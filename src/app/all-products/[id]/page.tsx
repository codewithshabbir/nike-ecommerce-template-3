import Button from '@/app/components/Button';
import { nikeProducts } from '@/app/components/Cards/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import addToCartIcon from "@public/images/icons/add-to-cart.svg";

// Define correct type for params
interface Params {
  id: string;
}

// Generate metadata for dynamic product pages
export async function generateMetadata({ params }: { params: Params }) {
  const product = nikeProducts.find((prod) => prod.id === parseInt(params.id));

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

// Generate static params to pre-render product pages at build time
export async function generateStaticParams() {
  return nikeProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

// Main Product Page Component
const ProductPage = ({ params }: { params: Params }) => {
  const product = nikeProducts.find((prod) => prod.id === parseInt(params.id));

  if (!product) {
    notFound(); // If no product found, show 404 page
  }

  return (
    <div className='grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-0 md:gap-10'>
      <div className='col-span-12 md:col-span-6'>
        <Image src={product.imagesUrls} alt={product.title} width={500} height={500} />
      </div>
      <div className='col-span-12 md:col-span-6 pr-18 pt-10 md:pt-0'>
        <h2 className='text-3xl'>{product.title}</h2>
        <p className='py-10'>{product.description}</p>
        <h3>{product.price}</h3>
        <div className='flex mt-6'>
          <Button text='Add to Cart' classNames="rounded-full py-2" />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;