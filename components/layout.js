import Navigation from './Navigation/Navigation';
// import Footer from './footer'
import Head from "next/head";
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Магесница</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      {/* <Image 
        rel="preload" 
        as="image" 
        src="/header-image.png" 
        alt="Header image" 
        width={1920} 
        height={400} 
        priority={true}
        sizes="(max-width: 1920px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        quality={100}
      /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}