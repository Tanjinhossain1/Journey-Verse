import Image from 'next/image'
import Link from 'next/link'

interface Destination {
  name: string
  image: string
  hotels: number
  tours: number
  rentals: number
  cars: number
  activities: number
}

const destinations: Destination[] = [
  {
    name: 'California',
    image: '/Catefornia/display.jpeg',
    hotels: 14,
    tours: 22,
    rentals: 22,
    cars: 19,
    activities: 18
  },
  {
    name: 'New York City',
    image: '/new-york.jpeg',
    hotels: 7,
    tours: 15,
    rentals: 15,
    cars: 15,
    activities: 18
  },
  {
    name: 'New Jersey',
    image: '/new Jersey.jpeg',
    hotels: 7,
    tours: 18,
    rentals: 11,
    cars: 10,
    activities: 17
  },
  {
    name: 'Los Angeles',
    image: '/los-angeles.jpeg',
    hotels: 8,
    tours: 23,
    rentals: 13,
    cars: 17,
    activities: 19
  },
  {
    name: 'San Francisco',
    image: '/san-francisco.jpeg',
    hotels: 5,
    tours: 13,
    rentals: 15,
    cars: 11,
    activities: 13
  },
  {
    name: 'Nevada',
    image: '/Nevada.jpeg',
    hotels: 11,
    tours: 20,
    rentals: 20,
    cars: 15,
    activities: 15
  }
]

export default function Destinations() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">Top destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <div key={index} className="relative overflow-hidden shadow-lg group rounded-xl">
            <Link href={'/'}>
            <div className="relative w-full h-64 overflow-hidden rounded-xl">
              <Image
                src={destination.image}
                alt={destination.name}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-100 group-hover:opacity-90">
              <h2 className="text-white text-2xl font-bold mb-2 text-center">{destination.name}</h2>
              <p className="text-white text-sm text-center">
                {destination.hotels} Hotels • {destination.tours} Tours • {destination.rentals} Rentals
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
  )
}