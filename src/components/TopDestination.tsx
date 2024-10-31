import { getCity } from "@/services/cities";
import { formatForUrlWith_under_score } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Destinations() {
  const destination = await getCity();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Top destinations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destination.map((destination, index) => (
          <div
            key={index}
            className="relative overflow-hidden shadow-lg group rounded-xl"
          >
            <Link href={`/destinations/${formatForUrlWith_under_score(destination?.city)}`}>
              <div className="relative w-full h-64 overflow-hidden rounded-xl">
                <Image
                  src={destination.displayImage}
                  alt={destination.city}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-100 group-hover:opacity-90">
                <h2 className="text-white text-2xl font-bold mb-2 text-center">
                  {destination.city}
                </h2>
                <p className="text-white text-sm text-center">
                  {destination.hotels} Hotels • {destination.tours} Tours •{" "}
                  {destination.rentals} Rentals
                </p>
                <p className="text-white text-sm text-center">
                  {destination.cars} Cars • {destination.activities} Activities
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
