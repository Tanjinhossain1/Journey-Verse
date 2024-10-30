import Image from "next/image";

const airlines = [
  { name: "American Airlines", logo: "/placeholder.svg" },
  { name: "Delta Air Lines", logo: "/placeholder.svg" },
  { name: "United Airlines", logo: "/placeholder.svg" },
  { name: "Southwest Airlines", logo: "/placeholder.svg" },
  { name: "Alaska Airlines", logo: "/placeholder.svg" },
  { name: "JetBlue Airways", logo: "/placeholder.svg" },
  { name: "Spirit Airlines", logo: "/placeholder.svg" },
  { name: "Frontier Airlines", logo: "/placeholder.svg" },
  { name: "Hawaiian Airlines", logo: "/placeholder.svg" },
  { name: "Allegiant Air", logo: "/placeholder.svg" },
  { name: "Sun Country Airlines", logo: "/placeholder.svg" },
  { name: "Envoy Air", logo: "/placeholder.svg" },
  { name: "Republic Airways", logo: "/placeholder.svg" },
  { name: "SkyWest Airlines", logo: "/placeholder.svg" },
  { name: "Mesa Airlines", logo: "/placeholder.svg" },
  { name: "Silver Airways", logo: "/placeholder.svg" },
  { name: "Compass Airlines", logo: "/placeholder.svg" },
  { name: "PSA Airlines", logo: "/placeholder.svg" },
  { name: "Piedmont Airlines", logo: "/placeholder.svg" },
  { name: "Air Wisconsin", logo: "/placeholder.svg" },
  { name: "GoJet Airlines", logo: "/placeholder.svg" },
  { name: "Trans States Airlines", logo: "/placeholder.svg" },
  { name: "ExpressJet Airlines", logo: "/placeholder.svg" },
  { name: "Cape Air", logo: "/placeholder.svg" },
];

export default function Airlines() {
  return (
   <div className="bg-[#f5f7fa] md:p-10">
     <div className="container mx-auto px-4 py-8 ">
      <h2 className="text-3xl font-bold text-center mb-2">
        Search Top Airlines
      </h2>
      <p className="text-center text-muted-foreground mb-6 text-gray-400">
      Airlines provide air transport for passengers and cargo, offering various service levels on domestic and international routes.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {airlines.map((airline, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="p-4 flex flex-col items-center">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={'/Nevada.jpeg'}
                //   src={airline.logo}
                  alt={`${airline.name} logo`}
                  layout="fill"
                  objectFit="contain"
                  className="transition-opacity duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-center line-clamp-2">
                {airline.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}
