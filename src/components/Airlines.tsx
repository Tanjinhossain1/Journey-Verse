import { formatForUrlWith_under_score } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

export interface AirlineTypes {
  name: string;
  logo: string;
  about: string;
}

export const airlines: AirlineTypes[] = [
  {
    name: "American Airlines",
    logo: "/airlines/american.jpg",
    about:
      "<h3>American Airlines</h3>" +
      "<p>Founded in 1930, American Airlines has grown to become one of the largest airlines in the world. Initially a small carrier formed from a merger of several smaller airlines, including Texas Air Transport and American Airways, it has its headquarters in Fort Worth, Texas. American Airlines now operates flights to over 350 destinations across more than 50 countries, serving millions of passengers each year.</p>" +
      "<p>The airline is a founding member of the Oneworld alliance and is known for its extensive domestic and international routes. Over the years, American Airlines has embraced technology, introducing innovations such as mobile check-in and in-flight Wi-Fi. The airline has also been recognized for its efforts in sustainability, including initiatives to reduce carbon emissions.</p>",
  },
  {
    name: "Delta Air Lines",
    logo: "/airlines/delta.jpg",
    about:
      "<h3>Delta Air Lines</h3>" +
      "<p>Delta Air Lines, established in 1924, is one of the oldest and most recognized airlines in the world. Originally starting as a crop-dusting operation called Huff Daland Dusters, it has evolved into a major global airline headquartered in Atlanta, Georgia. Delta's network spans over 325 destinations in more than 50 countries, making it a key player in the aviation industry.</p>" +
      "<p>The airline has been noted for its customer service and operational reliability, often ranking among the top airlines in various consumer satisfaction surveys. Delta was also one of the first airlines to adopt a frequent flyer program, significantly influencing the airline loyalty landscape. In recent years, Delta has focused on modernizing its fleet and enhancing passenger experience with upgraded amenities and services.</p>",
  },
  {
    name: "United Airlines",
    logo: "/airlines/united.jpg",
    about:
      "<h3>United Airlines</h3>" +
      "<p>Founded in 1926, United Airlines has grown into one of the largest airlines in the United States, with its main hub located in Chicago, Illinois. United operates an extensive network of international routes, connecting major cities across all continents. It serves over 300 destinations in more than 50 countries.</p>" +
      "<p>As a member of the Star Alliance, United collaborates with various global airlines to provide seamless travel options for its passengers. The airline has implemented numerous initiatives focused on improving customer experience, including upgraded cabins, enhanced in-flight services, and the introduction of new technology such as mobile boarding passes and in-flight Wi-Fi. United is also committed to sustainability and aims to achieve net-zero greenhouse gas emissions by 2050.</p>",
  },
  {
    name: "Southwest Airlines",
    logo: "/airlines/southest.jpg",
    about:
      "<h3>Southwest Airlines</h3>" +
      "<p>Founded in 1967, Southwest Airlines has redefined the airline industry with its low-cost business model. Headquartered in Dallas, Texas, it operates more than 4,000 flights daily, primarily within the United States. Southwest is known for its unique boarding process and no-frills service, which allows it to keep costs low and provide competitive fares.</p>" +
      "<p>The airline pioneered the concept of low-cost air travel and has been instrumental in making flying more accessible to the general public. Its approach to customer service emphasizes friendly interactions and a relaxed atmosphere. Southwest also offers a generous rewards program, encouraging repeat travel with the airline.</p>",
  },
  {
    name: "Alaska Airlines",
    logo: "/airlines/alaska.jpg",
    about:
      "<h3>Alaska Airlines</h3>" +
      "<p>Founded in 1932, Alaska Airlines is a major airline that primarily serves the western United States and parts of Canada and Mexico. Its headquarters are located in Seattle, Washington. Alaska Airlines has built a reputation for providing excellent customer service and has been recognized as one of the best airlines in the United States.</p>" +
      "<p>With a focus on the Pacific Northwest and Alaska, the airline offers flights to more than 100 destinations across the U.S., Canada, and Mexico. Alaska Airlines is known for its commitment to environmental sustainability, implementing several initiatives aimed at reducing its carbon footprint. In 2016, it merged with Virgin America, expanding its reach and customer base.</p>",
  },
  {
    name: "JetBlue Airways",
    logo: "/airlines/jet-blue.jpg",
    about:
      "<h3>JetBlue Airways</h3>" +
      "<p>Founded in 1998, JetBlue Airways is a low-cost airline based in New York City. The airline has gained popularity for its friendly service, spacious seating, and free in-flight entertainment, including live TV. JetBlue serves over 100 destinations in the U.S., Caribbean, and Latin America.</p>" +
      "<p>JetBlue was one of the first airlines to offer passengers free Wi-Fi on all flights and continues to innovate in the airline industry. The airline's unique brand and customer service philosophy have earned it a loyal following. JetBlue aims to provide an exceptional flying experience at an affordable price, balancing cost and quality.</p>",
  },
  {
    name: "Spirit Airlines",
    logo: "/airlines/sprit.jpg",
    about:
      "<h3>Spirit Airlines</h3>" +
      "<p>Founded in 1980, Spirit Airlines is an ultra-low-cost carrier headquartered in Miramar, Florida. Known for its low base fares, Spirit employs a business model that allows customers to pay only for the services they use, which can include additional fees for seat selection, baggage, and other amenities.</p>" +
      "<p>The airline primarily focuses on domestic flights but also offers international routes to the Caribbean and Latin America. Spirit has gained attention for its aggressive pricing strategies, catering to budget-conscious travelers looking for the lowest fares possible. Despite the additional fees, Spirit's model has made flying more affordable for many.</p>",
  },
  {
    name: "Frontier Airlines",
    logo: "/airlines/frontier.jpg",
    about:
      "<h3>Frontier Airlines</h3>" +
      "<p>Founded in 1994, Frontier Airlines is a low-cost carrier headquartered in Denver, Colorado. The airline is recognized for its animal-themed aircraft and commitment to environmental sustainability. Frontier operates numerous domestic and international flights, focusing on providing affordable travel options.</p>" +
      "<p>With a fleet primarily composed of Airbus A320 family aircraft, Frontier emphasizes a pay-for-what-you-use business model, allowing passengers to customize their travel experience. The airline has launched various initiatives to reduce its environmental impact, including using more fuel-efficient aircraft and implementing recycling programs.</p>",
  },
  {
    name: "Hawaiian Airlines",
    logo: "/airlines/hawaiian.jpg",
    about:
      "<h3>Hawaiian Airlines</h3>" +
      "<p>Founded in 1929, Hawaiian Airlines is the largest airline in Hawaii, operating flights between the Hawaiian Islands and offering non-stop service to the U.S. mainland and international destinations in Asia and the South Pacific. The airline prides itself on its authentic Hawaiian hospitality.</p>" +
      "<p>Hawaiian Airlines has a strong commitment to promoting Hawaiian culture and heritage through its service and branding. It operates a fleet of Airbus A321neo and Boeing 787 Dreamliner aircraft, providing a comfortable and enjoyable travel experience. The airline is known for its exceptional customer service and strong community involvement in Hawaii.</p>",
  },
  {
    name: "Allegiant Air",
    logo: "/airlines/allegiant.jpg",
    about:
      "<h3>Allegiant Air</h3>" +
      "<p>Founded in 1997, Allegiant Air is an American low-cost airline that primarily focuses on leisure travel. Headquartered in Las Vegas, Nevada, Allegiant operates flights to popular vacation destinations, making it a go-to airline for travelers seeking affordable holiday options.</p>" +
      "<p>The airline offers a unique business model that includes both scheduled and charter flights, allowing it to adapt to seasonal travel trends. Allegiant's focus on secondary airports often results in lower operating costs, which translates into lower fares for passengers. The airline has seen significant growth in recent years, capitalizing on the rising demand for budget travel.</p>",
  },
  {
    name: "Sun Country Airlines",
    logo: "/airlines/sun-country.jpg",
    about:
      "<h3>Sun Country Airlines</h3>" +
      "<p>Founded in 1982, Sun Country Airlines is a charter and scheduled airline based in Minneapolis, Minnesota. It primarily serves leisure destinations, particularly in Florida, and operates a fleet of Boeing 737 aircraft.</p>" +
      "<p>Sun Country Airlines offers both scheduled services and charter flights, focusing on vacation travel. The airline has undergone several transformations over the years, including expanding its route network and upgrading its fleet. In addition to affordable fares, Sun Country is known for its friendly service and commitment to providing a positive travel experience for its customers.</p>",
  },
  {
    name: "Envoy Air",
    logo: "/airlines/envoy.jpg",
    about:
      "<h3>Envoy Air</h3>" +
      "<p>Envoy Air is a regional airline that operates as a wholly-owned subsidiary of American Airlines Group. Founded in 1998, it serves more than 150 destinations across the United States and is based in Fort Worth, Texas.</p>" +
      "<p>Envoy operates flights under the American Eagle brand, providing essential regional connectivity for American Airlines. The airline's fleet consists of Embraer and Bombardier regional jets, allowing it to serve smaller markets effectively. Envoy Air plays a vital role in the American Airlines network, ensuring seamless connections for travelers across its extensive route system.</p>",
  },
  {
    name: "Republic Airways",
    logo: "/airlines/republic.jpg",
    about:
      "<h3>Republic Airways</h3>" +
      "<p>Republic Airways, operating as Republic Airlines, is a regional airline headquartered in Indianapolis, Indiana. Founded in 1979, it initially operated as a charter service before evolving into a regional airline providing services for major airlines including American Eagle and United Express.</p>" +
      "<p>The airline operates a fleet of Embraer E170 and E175 regional jets, focusing on short-haul routes. Republic Airways is known for its strong operational reliability and commitment to customer service, contributing significantly to the regional connectivity of its partners.</p>" +
      "<p>In addition to its primary operations, Republic Airways is recognized for its active involvement in community programs and sustainability initiatives, aimed at reducing its environmental footprint.</p>",
  },
  {
    name: "SkyWest Airlines",
    logo: "/airlines/sky-west.jpg",
    about:
      "<h3>SkyWest Airlines</h3>" +
      "<p>SkyWest Airlines is a regional airline headquartered in St. George, Utah. Founded in 1972, it operates flights for several major carriers under their brand names, including Delta Connection and United Express. As one of the largest regional airlines in the United States, SkyWest plays a critical role in connecting smaller cities to major hubs.</p>" +
      "<p>With a diverse fleet of Bombardier and Embraer aircraft, SkyWest provides flexible and efficient service to over 250 destinations. The airline is renowned for its high customer satisfaction ratings and has received numerous awards for its operational excellence.</p>" +
      "<p>SkyWest is also committed to innovation, actively exploring sustainable aviation technologies to enhance its operations.</p>",
  },
  {
    name: "Mesa Airlines",
    logo: "/airlines/mesa.jpg",
    about:
      "<h3>Mesa Airlines</h3>" +
      "<p>Founded in 1980, Mesa Airlines is a regional airline based in Phoenix, Arizona. Operating primarily as American Eagle and United Express, Mesa serves multiple destinations across the United States and the Caribbean, focusing on connecting smaller markets to larger hubs.</p>" +
      "<p>The airline operates a fleet of Bombardier CRJ-900 and Embraer 175 aircraft, emphasizing comfort and reliability for its passengers. Mesa Airlines has earned a reputation for its punctuality and safety, playing an essential role in the regional air service landscape.</p>" +
      "<p>In recent years, Mesa has also taken steps towards sustainability, implementing measures to reduce fuel consumption and enhance operational efficiency.</p>",
  },
  {
    name: "Silver Airways",
    logo: "/airlines/silver.jpg",
    about:
      "<h3>Silver Airways</h3>" +
      "<p>Silver Airways, established in 2011, is a regional airline based in Fort Lauderdale, Florida. It primarily serves routes in Florida and the Bahamas, offering convenient connections for both leisure and business travelers.</p>" +
      "<p>Silver operates a fleet of ATR 42 and ATR 72 aircraft, known for their fuel efficiency and suitability for short-haul flights. The airline prides itself on providing friendly service and a seamless travel experience.</p>" +
      "<p>Silver Airways is also focused on expanding its network and improving its services, recently launching new routes and partnerships to enhance connectivity for its passengers.</p>",
  },
  {
    name: "Compass Airlines",
    logo: "/airlines/compass.jpg",
    about:
      "<h3>Compass Airlines</h3>" +
      "<p>Compass Airlines was a regional airline that operated under the American Eagle brand, providing essential regional services. Founded in 2006 and based in Minneapolis, Minnesota, the airline primarily served destinations in the Midwest and Western U.S.</p>" +
      "<p>Compass operated a fleet of Embraer E175 aircraft, which offered a comfortable travel experience with modern amenities. Although Compass ceased operations in 2020, it was known for its commitment to safety and quality service during its years of operation.</p>" +
      "<p>The airline's legacy continues through the routes and connections it established, contributing to the regional aviation network.</p>",
  },
  {
    name: "PSA Airlines",
    logo: "/airlines/psa.jpg",
    about:
      "<h3>PSA Airlines</h3>" +
      "<p>PSA Airlines is a regional airline and a wholly-owned subsidiary of American Airlines Group. Operating as American Eagle, PSA serves several destinations in the eastern U.S., connecting communities to major hubs like Charlotte and Philadelphia.</p>" +
      "<p>Founded in 1970 and based in Dayton, Ohio, PSA operates a fleet of Bombardier CRJ-700 and CRJ-900 aircraft, focusing on providing a high-quality travel experience with complimentary snacks and beverages.</p>" +
      "<p>PSA is recognized for its strong operational performance and commitment to safety, making it a vital player in the regional aviation sector.</p>",
  },
  {
    name: "Piedmont Airlines",
    logo: "/airlines/piedmont.jpg",
    about:
      "<h3>Piedmont Airlines</h3>" +
      "<p>Piedmont Airlines, founded in 1931, is a regional airline that operates as American Eagle. Based in Salisbury, Maryland, it provides services to various destinations in the eastern U.S., playing a crucial role in connecting smaller markets with major cities.</p>" +
      "<p>With a fleet of Embraer and Bombardier aircraft, Piedmont focuses on delivering reliable and comfortable travel experiences. The airline has a strong reputation for customer service and operational efficiency.</p>" +
      "<p>Piedmont Airlines has also been proactive in enhancing its sustainability efforts, exploring initiatives to reduce its environmental impact.</p>",
  },
  {
    name: "Air Wisconsin",
    logo: "/airlines/wisconsin.jpg",
    about:
      "<h3>Air Wisconsin</h3>" +
      "<p>Air Wisconsin is a regional airline based in Appleton, Wisconsin, operating as United Express. Founded in 1965, it provides essential air services to smaller communities across the Midwest.</p>" +
      "<p>The airline operates a fleet of CRJ-200 and CRJ-700 aircraft, focusing on reliable service and community engagement. Air Wisconsin has built strong relationships with the communities it serves, emphasizing local connections and support.</p>" +
      "<p>Air Wisconsin is committed to operational excellence, maintaining high standards of safety and customer satisfaction.</p>",
  },
  {
    name: "GoJet Airlines",
    logo: "/airlines/gojet.jpg",
    about:
      "<h3>GoJet Airlines</h3>" +
      "<p>Founded in 2004, GoJet Airlines is a regional airline operating as United Express and Delta Connection. Headquartered in St. Louis, Missouri, GoJet serves destinations primarily in the Midwest, providing vital connections for travelers.</p>" +
      "<p>With a fleet of Embraer E175 aircraft, GoJet focuses on delivering a comfortable travel experience, including onboard services and amenities tailored to enhance passenger satisfaction.</p>" +
      "<p>GoJet is also recognized for its commitment to safety and operational efficiency, contributing positively to the regional airline landscape.</p>",
  },
  {
    name: "Trans States Airlines",
    logo: "/airlines/tsa-tsa.jpg",
    about:
      "<h3>Trans States Airlines</h3>" +
      "<p>Trans States Airlines was a regional airline operating under the American Eagle brand. Established in 1982, it served multiple destinations across the Midwest and Eastern U.S. before ceasing operations in 2020.</p>" +
      "<p>The airline operated a fleet of Embraer and Bombardier aircraft, focusing on reliable service and customer satisfaction. Trans States was known for its operational reliability and played an important role in the regional air service network.</p>" +
      "<p>Despite its closure, Trans States Airlines left a lasting impact on the communities it served and the regional airline industry.</p>",
  },
  {
    name: "ExpressJet Airlines",
    logo: "/airlines/express.jpg",
    about:
      "<h3>ExpressJet Airlines</h3>" +
      "<p>Founded in 1986, ExpressJet Airlines was a regional airline that provided services for United Express and American Eagle. After years of successful operations, the airline ceased operations in 2020 following bankruptcy.</p>" +
      "<p>ExpressJet operated a diverse fleet of Embraer and Bombardier jets, connecting smaller cities with major airports. It was recognized for its strong commitment to safety and customer service throughout its history.</p>" +
      "<p>The legacy of ExpressJet Airlines continues in the routes and partnerships it established, shaping the regional air service landscape.</p>",
  },
  {
    name: "Cape Air",
    logo: "/airlines/cap.jpg",
    about:
      "<h3>Cape Air</h3>" +
      "<p>Cape Air is a regional airline based in Barnstable, Massachusetts. Founded in 1989, it provides essential air services to destinations in the Northeast, the Caribbean, and the Midwest, focusing on connecting underserved markets.</p>" +
      "<p>Operating a fleet of Cessna 402 aircraft, Cape Air emphasizes personalized service and community engagement, often working closely with local governments and tourism boards to promote travel.</p>" +
      "<p>Cape Air has built a reputation for its commitment to safety and reliability, and it continues to innovate in the regional airline space.</p>",
  },
];

export default function Airlines() {
  return (
    <div className="bg-[#f5f7fa] md:p-10">
      <div className="container mx-auto px-4 py-8 ">
        <h2 className="text-3xl font-bold text-center mb-2">
          Search Top Airlines
        </h2>
        <p className="text-center text-muted-foreground mb-6 text-gray-400">
          Airlines provide air transport for passengers and cargo, offering
          various service levels on domestic and international routes.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <Link
                href={`/airline/${formatForUrlWith_under_score(airline.name)}`}
              >
                <div className="p-2 flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={airline.logo}
                      alt={`${airline.name} logo`}
                      layout="fill"
                      objectFit="contain"
                      className="transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center line-clamp-2 dark:text-white">
                    {airline.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
