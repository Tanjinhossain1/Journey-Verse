import Article from "@/components/Articles";
import Recommended from "@/components/Common/Recomended";
import Subscription from "@/components/Subscription";
import { getLovedHotels } from "@/services/loved-hotel";
import { CityType } from "@/types/city";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession();
  const lovedStatus = await getLovedHotels(session?.user?.email as string);
  return (
    <Fragment>
      <div className="w-3/4 mx-auto  ">
      <div className="dark:border dark:border-gray-400 md:w-3/4 mx-auto dark:p-2">

      
        <div className="grid gap-4 mb-6">
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
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden dark:text-gray-300"
                >
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
        <div className=" grid md:grid-cols-3 gap-2">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold  dark:text-gray-300">{destination?.[0]?.city}</h2>

            {(destination?.[0]?.about as AboutType[])?.map(
              (about: AboutType, index: number) => {
                return (
                  <Fragment key={index}>
                    <p className=" dark:text-gray-300">{about.detail}</p>
                    <br />
                    <hr className="text-gray-400" />
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
      </div>
      </div>
      <Recommended
        user={session?.user as User}
        loved_hotel={lovedStatus}
        city={destination?.[0]?.city}
      />
      <Subscription />
      <Article />
    </Fragment>
  );
}
