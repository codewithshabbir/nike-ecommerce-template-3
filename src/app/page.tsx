import Image from "next/image";
import Link from "next/link";
import nikeBanner from "@public/images/nike-banner.jpg";

export default function Home() {
  return (
    <section className="flex items-center flex-col bg-light-grey py-2 px-10">
      <h2>Hello Nike App</h2>
      <p>Download the app to access everything Nike. <Link href="#">Get Your Great</Link></p>
      <Image src={nikeBanner} alt=""/>
      <div className="flex flex-col items-center">
        <h3>First Look</h3>
        <h2 className="text-5xl uppercase">Nike Air Max Pulse</h2>
        <p className="w-1/2 text-center">Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse
        —designed to push you past your limits and help you go to the max.</p>
      </div>
    </section>
  );
}
