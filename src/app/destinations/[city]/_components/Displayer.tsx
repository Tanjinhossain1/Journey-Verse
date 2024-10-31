import Article from "@/components/Articles";
import Recommended from "@/components/Common/Recomended";
import Subscription from "@/components/Subscription";
import { getHotels } from "@/services/hotels";
import { CityType } from "@/types/city";
import { HotelType } from "@/types/hotels";
import Image from "next/image";
import React, { Fragment } from "react";

interface AboutType {
  detail: string;
}
export default async function Displayer({
  destination,
}: {
  destination: CityType[];
}) {
    const hotels = await getHotels();
  return (
    <div className="w-3/4 mx-auto">
      <div className="grid gap-4 mb-6 md:w-3/4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-[2/1]">
          <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
            <Image
              alt="Hotel main view"
              className="object-cover"
              fill
              src={(destination?.[0]?.images as string[])[0]}
            />
          </div>
          {(destination?.[0]?.images as string[])
            .slice(1, 5)
            .map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <Image
                  alt={`Hotel view ${index + 2}`}
                  className="object-cover"
                  fill
                  src={image}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="md:w-3/4 mx-auto grid md:grid-cols-3 gap-2">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold">{destination?.[0]?.city}</h2>

          {(destination?.[0]?.about as AboutType[])?.map(
            (about: AboutType, index: number) => {
              return (
                <Fragment key={index}>
                  <p>{about.detail}</p>
                  <br />
                  <br />
                </Fragment>
              );
            }
          )}
        </div>
        <div className="col-span-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10783742.778583706!2d-119.41793239999999!3d37.090240299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80b9f9c6f238cdd7%3A0xc9bc5d7d6b1b32e3!2sUnited%20States!5e0!3m2!1sen!2s!4v1635787000000!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of the United States"
          ></iframe>
        </div>
      </div>
     
      <Recommended hotels={hotels as HotelType[]} city={destination?.[0]?.city} />
      <Subscription />
      <Article />
    </div>
  );
}
