import Image from "next/image";
import React, { Fragment } from "react";

export default function Percentage() {
  return (
    <Fragment>
      <div className="md:flex justify-center max-w-[1200px] m-5 md:mx-auto my-20 gap-4 ">
        <div className="relative md:w-[600px] h-[300px] overflow-hidden rounded-2xl mb-5 md:mb-0 dark:border-2 dark:border-gray-100">
          <Image
            alt="50-off image"
            layout="fill" 
            src="/50-off.jpeg"
            className="transition-transform duration-300 transform hover:scale-110 object-contain md:object-cover"
          />
        </div>

        <div className="relative md:w-[600px] h-[300px] overflow-hidden rounded-2xl dark:border-2 dark:border-gray-100">
          <Image
            alt="20-off image"
            layout="fill" 
            src="/20-off.jpeg"
            className="transition-transform duration-300 transform hover:scale-110 object-contain md:object-cover"
          />
        </div>
      </div>
    </Fragment>
  );
}
