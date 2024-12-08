// src/app/all-products/[id]/page.tsx
import Button from '@/app/components/Button';
import { nikeProducts } from '@/app/components/Cards/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import addToCartIcon from "@public/images/icons/add-to-cart.svg";

export async function generateMetadata({ params }: { params: { id: string } }) {
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

export async function generateStaticParams() {
  return nikeProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const product = nikeProducts.find((prod) => prod.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className='grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-0 md:gap-10'>
        <div className='col-span-12 md:col-span-6'>
            <Image src={product.imagesUrls} alt={product.title} width={500} height={500}/>
        </div>
        <div className='col-span-12 md:col-span-6  pr-18 pt-10 md:pt-0'>
            <h2 className='text-3xl'>{product.title}</h2>
            <p className='py-10'>Turn style on its head with this crafted take on the Air Jordan 1 Mid. Its "inside out"-inspired construction, including unique layering and exposed foam accents, ups the ante on this timeless Jordan Brand silhouette. Details like the deco stitching on the Swoosh add coveted appeal, while the unexpected shading, rich mixture of materials and aged midsole aesthetic give this release an artisan finish.</p>
            <h3>{product.price}</h3>
            <div className='flex mt-6'>
                <Button text='Add to Cart' classNames="rounded-full py-2"/>
            </div>
        </div>
    </div>
  );
};

export default ProductPage;