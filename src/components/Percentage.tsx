import Image from 'next/image';
import React, { Fragment } from 'react';

export default function Percentage() {
  return (
    <Fragment>
      <div className='md:flex justify-center max-w-[1200px] m-5 md:mx-auto my-20 gap-4'>
        {/* First Image */}
        <div className='relative w-[600px] h-[300px] overflow-hidden rounded-2xl mb-5 md:mb-0'>
          <Image
            alt='50-off image'
            layout='fill' // Fill the container dimensions
            objectFit='cover' // Cover ensures it maintains aspect ratio while filling
            src='/50-off.jpeg'
            className='transition-transform duration-300 transform hover:scale-110'
          />
        </div>
        {/* Second Image */}
        <div className='relative w-[600px] h-[300px] overflow-hidden rounded-2xl'>
          <Image
            alt='20-off image'
            layout='fill' // Fill the container dimensions
            objectFit='cover' // Cover ensures it maintains aspect ratio while filling
            src='/20-off.jpeg'
            className='transition-transform duration-300 transform hover:scale-110'
          />
        </div>
      </div>
    </Fragment>
  );
}
