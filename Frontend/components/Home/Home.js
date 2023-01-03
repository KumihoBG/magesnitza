import React from "react";
import Image from 'next/image';
import Book from "../Book/Book";

const Home = () => (
  <div>
    <Image
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
    />
    <Book />
  </div>
);

export default Home;
