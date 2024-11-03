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
    about: `<div class="max-w-2xl mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">American Airlines: A Journey Through Time</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    American Airlines, founded in 1930, has evolved from a mail carrier to one of the most influential airlines worldwide. With a history of remarkable innovations and expansion, it has played a vital role in shaping the aviation industry, connecting millions across continents.
  </p>

  <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Origins and Early Years</h2>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    American Airlines traces its beginnings to April 15, 1926, when Charles Lindbergh flew a mail route for Robertson Aircraft Corporation. This company, along with others, merged to form American Airways in the early 1930s, which then rebranded to American Airlines, eventually shifting from mail services to passenger transport.
  </p>

  <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Pioneering Innovations and Expansion</h2>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Following World War II, American Airlines expanded significantly, pioneering transcontinental routes and introducing pressurized cabins for higher-altitude, comfortable flights. The development of the SABRE computer reservation system in the 1960s revolutionized ticketing, setting industry standards for efficiency and accessibility.
  </p>

  <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The 1980s: Transformation and Growth</h2>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    During the 1980s, American Airlines adopted the hub-and-spoke model, starting with Dallas-Fort Worth International Airport as a major hub. This system allowed for more streamlined connections and efficient routing, reshaping the airline industry. The introduction of “Super Saver” fares also made flying accessible to more people.
  </p>

  <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Modern Fleet and Global Influence</h2>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Today, American Airlines operates one of the most extensive and modern fleets, including the Boeing 787 Dreamliner and Airbus A321neo, which prioritize passenger comfort and fuel efficiency. The airline is a member of the Oneworld alliance, connecting passengers to destinations worldwide in collaboration with global partners.
  </p>

  <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Challenges and Resilience</h2>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    American Airlines has faced numerous challenges, from economic downturns to the impact of the COVID-19 pandemic. Despite these hardships, the airline continues to innovate and adapt, focusing on sustainability and improving passenger experience.
  </p>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    With a legacy of over 90 years, American Airlines stands as a symbol of American resilience and ingenuity in the aviation sector.
  </p>

  <a href="https://www.aa.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about American Airlines</a>
</div>
`,
  },
  {
    name: "Delta Air Lines",
    logo: "/airlines/delta.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Delta Air Lines: A Comprehensive Journey</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1925, Delta Air Lines has transformed into one of the most recognizable and influential airlines in the world. Known for its commitment to innovation, customer experience, and sustainability, Delta has continually set standards in the aviation industry, connecting travelers across the globe.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Early Beginnings and Growth</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Delta’s origins trace back to a small crop-dusting operation in Macon, Georgia. As the airline expanded, it began focusing on passenger transport, quickly establishing itself as a key player in U.S. domestic flights. By the mid-20th century, Delta had transitioned from regional routes to a broader network that covered major U.S. cities, propelling it to the forefront of the aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Innovations in Technology and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Delta has consistently led the way in airline technology and customer service innovations. In the 1960s, Delta was among the first airlines to adopt computerized booking systems, enabling faster and more reliable service. This commitment to technology extended to in-flight amenities, with Delta pioneering entertainment systems and enhanced cabin experiences that cater to modern travelers’ expectations.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Delta’s Approach to Sustainability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Delta Air Lines is committed to reducing its environmental impact, taking significant steps toward sustainability. The airline has set ambitious goals to reduce emissions, invest in alternative fuels, and adopt more energy-efficient aircraft. These measures reflect Delta’s leadership in responsible aviation practices, which resonate with environmentally conscious travelers and industry partners.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Service Excellence</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Delta’s reputation for customer service is well-earned, thanks to its focus on enhancing the passenger experience. From seamless check-ins to attentive in-flight services, Delta prioritizes convenience and comfort for travelers. The airline has also invested in mobile technology, enabling customers to check-in, track their bags, and access flight information directly from their devices.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Global Expansion and Network</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Today, Delta operates a vast global network, with flights covering North America, Europe, Asia, Africa, and beyond. Its membership in the SkyTeam alliance enables Delta to offer its passengers access to a wide network of partner airlines, enhancing connectivity and convenience for international travelers. This global presence is a testament to Delta’s success and influence in the aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Goals and Innovations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Delta remains focused on technological advancements, sustainability, and furthering its global reach. The airline’s investments in artificial intelligence and data analytics aim to improve operational efficiency and customer satisfaction. Delta’s commitment to a greener future aligns with its goals to lead the aviation sector in responsible travel practices.
    </p>
  </div>

  <a href="https://www.delta.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Delta Air Lines</a>
</div>
`,
  },
  {
    name: "United Airlines",
    logo: "/airlines/united.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">United Airlines: A Journey Through Innovation and Service</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    United Airlines, one of America’s legacy carriers, has built a remarkable history since its founding in 1926. Known for its vast network, commitment to sustainability, and innovations in aviation technology, United has transformed air travel for millions of passengers worldwide. As the airline continues to expand, it remains focused on delivering an exceptional travel experience while addressing the needs of modern travelers.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Early Years and Expansion</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      United Airlines traces its roots to the 1920s, when it started as Varney Air Lines, a mail carrier that evolved into a major passenger airline. By the 1930s, United expanded its routes across the United States, offering passenger services that established it as a prominent national carrier. The airline’s merger with Continental Airlines in 2010 was a landmark move, creating one of the world’s largest airlines and expanding its global reach.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Technological Advancements</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      United has consistently leveraged technology to enhance the passenger experience. As an early adopter of online booking and check-in services, United made travel more convenient for customers. Today, the airline uses advanced data analytics, artificial intelligence, and machine learning to optimize its operations, ensuring timely departures and improved flight schedules.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Innovations in Customer Service</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      United Airlines is dedicated to providing excellent customer service through innovations such as mobile apps that allow passengers to manage their bookings, access real-time flight updates, and navigate airports seamlessly. United’s premium offerings, including Polaris Business Class, redefine luxury with enhanced comfort and personalized service, attracting frequent flyers and business travelers alike.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Focus on Sustainability and Environmental Responsibility</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      In recent years, United has placed a strong emphasis on reducing its environmental impact. The airline is committed to reaching net-zero emissions by 2050, leading the industry in sustainable aviation fuel usage and supporting carbon offset programs. By investing in eco-friendly practices, United aligns itself with global environmental goals and resonates with eco-conscious travelers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Global Reach and Network</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      United’s extensive network spans North America, Asia, Europe, Latin America, and beyond. As a founding member of the Star Alliance, United collaborates with international partner airlines, offering travelers a vast selection of destinations worldwide. The airline’s hubs in cities like Chicago, Houston, and San Francisco make it a key player in global travel and connectivity.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Vision and Expansion</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking to the future, United Airlines aims to expand its network while continuing to innovate. The airline is investing in next-generation aircraft, advanced technology, and enhanced customer service offerings. As United progresses, it remains committed to creating a more sustainable, efficient, and enjoyable travel experience for all passengers.
    </p>
  </div>

  <a href="https://www.united.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about United Airlines</a>
</div>
`,
  },
  {
    name: "Southwest Airlines",
    logo: "/airlines/southest.jpg",
    about:
`<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Southwest Airlines: The Heart of Low-Cost Travel</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Southwest Airlines has revolutionized the airline industry since its inception in 1967. Known for its low-cost fares, friendly service, and no-frills approach, Southwest has become a favorite among travelers in the United States and beyond. With a unique business model that emphasizes efficiency and customer satisfaction, the airline continues to thrive in an ever-changing travel landscape.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Foundation and Early Years</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Founded by Herb Kelleher and Rollin King, Southwest Airlines began operations in 1971 as Air Southwest Company. Initially serving short-haul routes in Texas, the airline quickly gained popularity for its unique approach to air travel. With a fleet of Boeing 737 aircraft, Southwest focused on quick turnaround times and low operating costs, allowing it to offer competitive fares.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Innovative Business Model</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Southwest Airlines operates on a point-to-point transit model, contrasting the hub-and-spoke model used by many competitors. This strategy allows for greater flexibility in flight scheduling and a more extensive network of direct routes. Additionally, Southwest's decision to maintain a single aircraft type—the Boeing 737—simplifies maintenance and training, reducing costs and increasing efficiency.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Service and Culture</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Southwest is renowned for its exceptional customer service, characterized by friendly staff and a relaxed atmosphere. The airline's unique culture fosters a sense of community among employees and passengers alike. By empowering employees to make decisions that enhance customer satisfaction, Southwest creates a positive travel experience that keeps customers returning.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Innovations and Technology</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As the airline industry evolves, Southwest continues to innovate. The implementation of mobile boarding passes, in-flight Wi-Fi, and an intuitive app allows passengers to manage their travel seamlessly. Additionally, Southwest has invested in new technologies to improve operational efficiency and reduce delays, ensuring a reliable flying experience.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Sustainability Initiatives</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Committed to sustainability, Southwest Airlines is actively working to reduce its environmental impact. Initiatives include investing in fuel-efficient aircraft, optimizing flight paths to decrease fuel consumption, and implementing recycling programs onboard. By focusing on sustainable practices, Southwest aims to contribute positively to the environment while maintaining its commitment to low-cost travel.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Outlook and Growth</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Southwest Airlines plans to expand its route network while enhancing customer offerings. With a focus on technology and sustainability, the airline aims to adapt to changing market dynamics and passenger preferences. As air travel resumes post-pandemic, Southwest is well-positioned to capitalize on demand and continue its legacy of low-cost, high-quality service.
    </p>
  </div>

  <a href="https://www.southwest.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Southwest Airlines</a>
</div>
`,
  },
  {
    name: "Alaska Airlines",
    logo: "/airlines/alaska.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Alaska Airlines: A Commitment to Quality and Service</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Alaska Airlines, established in 1932, has evolved into one of the premier airlines in the United States. Known for its exceptional customer service, operational reliability, and extensive network, Alaska Airlines connects travelers to over 115 destinations across the U.S., Canada, and Mexico. The airline's commitment to sustainability and innovation further sets it apart in the competitive aviation industry, making it a favorite among frequent flyers.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Rich History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Alaska Airlines began as McGee Airways in 1932, flying routes in Alaska with a single aircraft. The airline evolved through various mergers and acquisitions, adopting the Alaska Airlines name in 1944. Over the decades, Alaska Airlines expanded its services, focusing on the West Coast and offering reliable and efficient air travel. Its commitment to safety and customer service has helped the airline build a loyal customer base and establish a strong brand in the aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Service and Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Alaska Airlines prides itself on providing top-notch customer service. With a focus on creating a welcoming atmosphere, the airline trains its staff to prioritize passenger needs and ensure a pleasant flying experience. Travelers enjoy features like free in-flight entertainment, complimentary snacks, and a robust frequent flyer program, Mileage Plan, which rewards loyal customers with points for every mile flown. Alaska Airlines' commitment to service has earned it numerous accolades, including high rankings in customer satisfaction surveys.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Sustainability Initiatives</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Alaska Airlines is dedicated to reducing its environmental impact through various sustainability initiatives. The airline has invested in fuel-efficient aircraft and sustainable aviation fuels to decrease carbon emissions. Additionally, Alaska Airlines has implemented recycling programs and waste reduction strategies on flights and in its operations. The airline's commitment to sustainability is integral to its business model, ensuring that it operates responsibly while serving its passengers and communities.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Technological Innovations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Embracing technological advancements, Alaska Airlines continually enhances the travel experience for its customers. The airline's mobile app offers seamless booking, flight tracking, and check-in processes, making air travel more convenient. Onboard, passengers can enjoy in-flight Wi-Fi and a variety of entertainment options. These innovations not only improve customer satisfaction but also streamline operations, allowing the airline to maintain its competitive edge in the market.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Growth and Expansion</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking to the future, Alaska Airlines aims to expand its network and enhance its services. With a focus on both domestic and international routes, the airline is poised for growth as travel demand continues to rebound. Alaska Airlines is also exploring partnerships and alliances to offer more destinations and improved connectivity for its customers. By prioritizing innovation and customer service, Alaska Airlines is well-positioned for sustained success in the competitive aviation landscape.
    </p>
  </div>

  <a href="https://www.alaskaair.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Alaska Airlines</a>
</div>
`,
  },
  {
    name: "JetBlue Airways",
    logo: "/airlines/jet-blue.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">JetBlue Airways: Innovating Air Travel</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1998, JetBlue Airways has emerged as a significant player in the U.S. airline industry, known for its low-cost fares and customer-centric approach. With a focus on providing quality service and a comfortable flying experience, JetBlue operates flights to over 100 destinations across the United States, the Caribbean, and Latin America. Its commitment to innovation and sustainability distinguishes JetBlue from its competitors, making it a preferred choice for travelers seeking value without compromising on quality.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Dynamic History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      JetBlue Airways was founded by David Neeleman in 1998 with the goal of making air travel more accessible and enjoyable. The airline took to the skies in February 2000, offering affordable fares and a unique in-flight experience, which included free snacks and satellite television at every seat. JetBlue quickly gained popularity among travelers for its value-driven model and exceptional customer service, and within a few years, it became one of the largest low-cost carriers in the United States.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Experience and Service</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      JetBlue's commitment to delivering a superior customer experience sets it apart from other airlines. The airline offers spacious seating, free Wi-Fi on all flights, and a selection of complimentary snacks and drinks. JetBlue's customer service representatives are trained to prioritize passenger needs, ensuring a pleasant travel experience from booking to landing. Additionally, the airline’s TrueBlue loyalty program rewards frequent flyers with points for travel, making it an attractive option for both leisure and business travelers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Sustainability Efforts</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      JetBlue is dedicated to reducing its environmental footprint through various sustainability initiatives. The airline has set ambitious goals to become carbon neutral by 2040 and is actively investing in sustainable aviation fuels, fleet modernization, and energy-efficient technologies. JetBlue's commitment to environmental stewardship includes waste reduction programs and community involvement, further solidifying its reputation as a responsible airline that prioritizes sustainability while providing exceptional service to its customers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Innovation and Technology</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      JetBlue embraces technological advancements to enhance the travel experience for its customers. The airline's mobile app allows passengers to easily book flights, manage reservations, and check in from their devices. Additionally, JetBlue has implemented in-flight entertainment systems that offer a wide range of movies, TV shows, and music, ensuring passengers stay entertained throughout their journey. These innovations contribute to a more seamless and enjoyable travel experience, reinforcing JetBlue's reputation as a forward-thinking airline.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Aspirations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As JetBlue looks to the future, it aims to expand its network and enhance its service offerings. The airline is exploring new routes and destinations to accommodate growing travel demand. JetBlue is also focused on maintaining its commitment to customer service excellence and operational reliability while pursuing innovative strategies to adapt to the evolving travel landscape. By prioritizing sustainability and customer experience, JetBlue is well-positioned for continued success in the competitive airline industry.
    </p>
  </div>

  <a href="https://www.jetblue.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about JetBlue Airways</a>
</div>
`,
  },
  {
    name: "Spirit Airlines",
    logo: "/airlines/sprit.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Spirit Airlines: The Ultra-Low-Cost Carrier</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1980, Spirit Airlines has become a prominent player in the airline industry, known for its ultra-low-cost model that emphasizes affordability while providing a no-frills travel experience. With a focus on delivering low fares, Spirit operates over 75 destinations across the United States, Latin America, and the Caribbean. The airline's unique approach to air travel has garnered both praise and criticism, making it a distinctive choice for budget-conscious travelers.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Rich History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Spirit Airlines began as a small charter company called Charter One, providing flights for travelers to various destinations. In 1992, the company rebranded itself as Spirit Airlines and shifted its focus to scheduled airline services. The airline gained notoriety for its low-cost fares, allowing travelers to fly without breaking the bank. Over the years, Spirit has expanded its route network and become one of the largest low-cost carriers in the United States, serving millions of passengers annually.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Spirit Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Spirit Airlines differentiates itself through its no-frills service model, offering ultra-low fares with the option to purchase additional services. While the airline's base fare is significantly lower than traditional carriers, passengers should be aware that amenities such as checked baggage, seat selection, and in-flight refreshments come at an extra cost. This approach allows travelers to customize their journey according to their needs and budget, although it may result in additional expenses for those who prefer a more inclusive flying experience.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a top priority for Spirit Airlines, which adheres to strict safety regulations and guidelines set by the Federal Aviation Administration (FAA). The airline's modern fleet of Airbus A320 family aircraft is equipped with advanced safety features and technology. Spirit Airlines has also implemented health and safety measures to protect passengers and crew, especially during the COVID-19 pandemic. This commitment to safety and reliability has helped the airline build trust among its passengers, ensuring they feel secure while flying with Spirit.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Environmental Responsibility</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Spirit Airlines is committed to minimizing its environmental impact and has implemented various sustainability initiatives. The airline focuses on improving fuel efficiency, reducing waste, and exploring sustainable aviation fuels. Spirit's fleet modernization efforts aim to replace older aircraft with newer, more environmentally friendly models, contributing to reduced emissions. By prioritizing environmental responsibility, Spirit Airlines demonstrates its dedication to sustainable practices while providing affordable air travel options.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Goals</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Spirit Airlines aims to continue expanding its route network and enhancing its service offerings. The airline is focused on improving operational efficiency and providing customers with more convenient travel options. Spirit also plans to invest in technology to streamline the booking process and enhance the overall passenger experience. By remaining committed to its ultra-low-cost model while evolving with the needs of travelers, Spirit Airlines is poised for future growth in the competitive airline industry.
    </p>
  </div>

  <a href="https://www.spirit.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Spirit Airlines</a>
</div>
`,
  },
  {
    name: "Frontier Airlines",
    logo: "/airlines/frontier.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Frontier Airlines: The Eco-Friendly Low-Cost Carrier</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Frontier Airlines, founded in 1994, is known for its commitment to providing affordable air travel while emphasizing sustainability and environmental responsibility. With its headquarters in Denver, Colorado, Frontier operates flights to over 100 destinations across the United States, Mexico, and the Caribbean. The airline's mission is to offer low fares while being environmentally conscious, making it a popular choice among budget travelers who also care about the planet.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      The airline was originally founded as a regional carrier serving the western United States. After experiencing several ownership changes and financial challenges, Frontier Airlines reemerged as a low-cost carrier in 2001, adopting the model that focuses on providing affordable fares with optional services for an additional fee. This shift allowed Frontier to grow rapidly and expand its network, establishing itself as a key player in the low-cost airline market.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Frontier Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Frontier Airlines follows an ultra-low-cost model, offering low base fares while charging for additional services such as seat selection, baggage, and refreshments. This approach allows passengers to customize their travel experience based on their budget and preferences. While some travelers appreciate the cost savings, others may find the lack of included amenities challenging. Nonetheless, Frontier's focus on affordability attracts millions of passengers each year.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Sustainability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Frontier Airlines is a pioneer in environmental responsibility among low-cost carriers. The airline is dedicated to reducing its carbon footprint and improving fuel efficiency. Frontier's fleet consists of modern Airbus A320 family aircraft, known for their fuel efficiency and lower emissions compared to older models. Additionally, Frontier has implemented various initiatives to reduce waste and promote recycling, aligning its operations with eco-friendly practices.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety Measures and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a top priority for Frontier Airlines, which adheres to strict safety regulations set forth by the Federal Aviation Administration (FAA). The airline conducts regular maintenance checks and training to ensure the highest safety standards are met. Frontier's commitment to reliability is reflected in its operational performance, striving to maintain on-time departures and arrivals to enhance the passenger experience.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Looking Ahead</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Frontier Airlines aims to expand its route network while continuing to enhance its sustainability initiatives. The airline plans to invest in new technology to improve customer service and operational efficiency. By focusing on providing low-cost travel options without compromising on safety or environmental responsibility, Frontier is positioned for continued growth in the competitive airline industry.
    </p>
  </div>

  <a href="https://www.flyfrontier.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Frontier Airlines</a>
</div>
`,
  },
  {
    name: "Hawaiian Airlines",
    logo: "/airlines/hawaiian.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Hawaiian Airlines: Aloha Spirit in the Skies</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Established in 1929, Hawaiian Airlines is the largest and longest-serving airline in Hawaii, known for its exceptional service and commitment to showcasing the unique culture and beauty of the Hawaiian Islands. Operating inter-island and international flights, Hawaiian Airlines serves over 30 destinations, connecting travelers with the rich heritage and stunning landscapes of Hawaii. With a strong emphasis on customer experience, Hawaiian Airlines combines comfort, hospitality, and Hawaiian traditions in every flight.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Rich History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Hawaiian Airlines was founded as Inter-Island Airways, offering flights between the Hawaiian Islands. The airline rebranded in 1941 to Hawaiian Airlines and began expanding its services to the U.S. mainland and international destinations. Throughout its history, Hawaiian Airlines has been a pioneer in aviation, introducing innovations such as the first scheduled flights between the mainland and Hawaii. The airline's history is intertwined with the growth of tourism in Hawaii, helping to establish the islands as a premier vacation destination.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Hawaiian Airlines Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Hawaiian Airlines is renowned for its exceptional customer service and commitment to delivering a unique travel experience that reflects the spirit of aloha. Passengers can enjoy complimentary meals featuring Hawaiian-inspired cuisine and beverages on inter-island and long-haul flights. The airline also offers comfortable seating and an array of entertainment options, including movies and music that celebrate Hawaiian culture. With an emphasis on hospitality, Hawaiian Airlines ensures that every journey feels like a warm welcome to the islands.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a top priority for Hawaiian Airlines, which adheres to stringent safety regulations and standards set by the Federal Aviation Administration (FAA). The airline maintains a modern fleet of Airbus A321neo and Boeing 787 Dreamliner aircraft, equipped with advanced safety features and technology. Hawaiian Airlines has established a strong reputation for reliability, consistently achieving high on-time performance rates, ensuring passengers can trust that their travel plans will go smoothly.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Environmental Initiatives</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Hawaiian Airlines is committed to sustainability and reducing its environmental impact. The airline focuses on fuel efficiency and operational practices that minimize carbon emissions. Initiatives include fleet modernization, waste reduction programs, and partnerships with local organizations to promote environmental stewardship. By prioritizing eco-friendly practices, Hawaiian Airlines aims to preserve the natural beauty of the Hawaiian Islands for future generations while providing affordable travel options.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Looking Forward</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As Hawaiian Airlines looks to the future, the airline is focused on expanding its route network and enhancing the travel experience for its passengers. With plans to introduce new destinations and improve services, Hawaiian Airlines aims to remain a leader in the airline industry. The airline continues to invest in technology and innovations that enhance customer satisfaction while maintaining its commitment to safety and environmental responsibility.
    </p>
  </div>

  <a href="https://www.hawaiianairlines.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Hawaiian Airlines</a>
</div>
`,
  },
  {
    name: "Allegiant Air",
    logo: "/airlines/allegiant.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Allegiant Air: Your Gateway to Affordable Travel</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1997, Allegiant Air is a low-cost airline based in Las Vegas, Nevada. Specializing in leisure travel, Allegiant connects travelers to popular vacation destinations across the United States and beyond. With a business model that focuses on providing affordable fares and direct flights to secondary airports, Allegiant Air has become a favorite among budget-conscious travelers looking for convenient travel options.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Allegiant Air started as a charter airline before transitioning to a scheduled service model in 2001. The airline's growth has been fueled by its unique approach to low-cost travel, focusing on direct flights to underserved destinations. Allegiant Air's strategy of flying to smaller airports enables it to offer lower fares and avoid the congestion of larger airports, making travel more accessible for many passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Allegiant Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Allegiant Air's business model emphasizes low base fares while offering optional services for additional fees. Passengers can choose to pay for extras such as seat selection, priority boarding, and baggage allowances. This flexibility allows travelers to tailor their experience according to their budget and needs. While the airline's no-frills approach may not appeal to all, it has garnered a loyal customer base who appreciate the cost savings.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a paramount concern for Allegiant Air, which adheres to the strict guidelines set by the Federal Aviation Administration (FAA). The airline operates a modern fleet of Airbus A320 family aircraft, known for their reliability and efficiency. Allegiant Air is committed to maintaining high safety standards through regular maintenance, training, and operational practices, ensuring passengers can travel with peace of mind.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community and Environmental Commitment</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Allegiant Air is dedicated to making a positive impact in the communities it serves. The airline supports various charitable initiatives and partners with local organizations to give back to the community. Additionally, Allegiant is committed to sustainability, focusing on reducing its environmental footprint through fuel-efficient operations and other eco-friendly practices. This commitment helps preserve the destinations travelers love to visit.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Outlook</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Allegiant Air aims to continue expanding its network and improving the travel experience for its passengers. The airline plans to introduce new routes and enhance its services to meet the evolving needs of travelers. By focusing on affordable travel options while maintaining safety and customer satisfaction, Allegiant Air is well-positioned for continued success in the competitive airline industry.
    </p>
  </div>

  <a href="https://www.allegiantair.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Allegiant Air</a>
</div>
`,
  },
  {
    name: "Sun Country Airlines",
    logo: "/airlines/sun-country.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Sun Country Airlines: Affordable Travel with a Local Touch</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1982, Sun Country Airlines is a low-cost carrier based in Minneapolis, Minnesota. With a focus on providing affordable travel options, the airline connects passengers to various destinations in the United States, Mexico, and the Caribbean. Sun Country Airlines is known for its friendly service, convenient schedules, and dedication to enhancing the travel experience for budget-conscious travelers seeking leisure and adventure.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Originally launched as a charter airline, Sun Country Airlines transitioned to a scheduled airline model in 1999. The company gained recognition for its low-cost fare structure and ability to serve secondary airports, providing travelers with affordable options to popular destinations. Over the years, Sun Country Airlines has evolved to meet the changing demands of the travel industry, expanding its route network and improving its service offerings.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Sun Country Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Sun Country Airlines aims to deliver a quality travel experience that balances affordability and comfort. While the airline operates on a low-cost model, it offers a range of amenities, including complimentary snacks and beverages on flights. Passengers can also purchase additional services, such as priority boarding and extra baggage, allowing for a customizable travel experience that meets individual needs.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a critical focus for Sun Country Airlines, which adheres to rigorous safety standards set forth by the Federal Aviation Administration (FAA). The airline operates a modern fleet of Boeing 737 aircraft, ensuring that all flights maintain high safety and operational standards. Sun Country Airlines is dedicated to providing reliable service and minimizing delays, allowing passengers to travel with confidence.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Engagement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Sun Country Airlines is committed to supporting the communities it serves. The airline participates in various charitable initiatives and partnerships with local organizations to give back to the community. Through its philanthropic efforts, Sun Country Airlines aims to make a positive impact and contribute to the well-being of the regions it connects, reflecting its core values of service and community spirit.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Looking Ahead</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As Sun Country Airlines looks to the future, it aims to continue expanding its route offerings and improving the overall travel experience for its passengers. The airline is focused on integrating technology and innovations to enhance operational efficiency while maintaining its commitment to affordability and customer satisfaction. With plans to grow its presence in both leisure and business travel markets, Sun Country Airlines is poised for continued success in the evolving airline industry.
    </p>
  </div>

  <a href="https://www.suncountry.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Sun Country Airlines</a>
</div>
`,
  },
  {
    name: "Envoy Air",
    logo: "/airlines/envoy.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Envoy Air: A Key Player in Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Envoy Air, a wholly owned subsidiary of American Airlines Group, is one of the largest regional airlines in the United States. Based in Fort Worth, Texas, Envoy provides essential feeder services to American Airlines and operates an extensive network of flights across the United States, Canada, Mexico, and the Caribbean. With a commitment to safety, efficiency, and customer satisfaction, Envoy Air plays a crucial role in connecting passengers to the broader American Airlines network.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Founded in 1984 as a regional airline, Envoy Air has undergone significant growth and transformation over the years. Originally known as Monarch Airlines, it was rebranded as Envoy Air in 2014 following its acquisition by American Airlines. This strategic merger enabled Envoy to expand its operations and enhance its service offerings, solidifying its position as a leading regional carrier in the United States.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Envoy Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Envoy Air operates a fleet of over 150 regional jets, including the Embraer E175 and Bombardier CRJ900 aircraft. The airline is dedicated to providing a comfortable travel experience, with features such as spacious cabins, inflight refreshments, and friendly service. As a key partner of American Airlines, Envoy flights are often branded under the American Eagle name, allowing passengers to enjoy seamless connections to a vast array of domestic and international destinations.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is of utmost importance to Envoy Air, which adheres to strict FAA regulations and industry standards. The airline prioritizes rigorous training for its pilots and crew members, ensuring that all operational procedures are followed diligently. With a strong safety record, Envoy Air is committed to providing a secure travel environment for all its passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Involvement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Envoy Air actively engages in community initiatives, supporting various charitable organizations and programs across the regions it serves. The airline encourages its employees to participate in volunteer opportunities and contribute to community development. Through these efforts, Envoy aims to make a positive impact and foster strong relationships within the communities it operates.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Outlook</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As a vital component of American Airlines' operations, Envoy Air is poised for continued growth and success. The airline plans to expand its route network and enhance its fleet, ensuring it remains competitive in the regional aviation market. By focusing on innovation and customer service, Envoy Air is committed to meeting the evolving needs of travelers and maintaining its position as a leading regional carrier.
    </p>
  </div>

  <a href="https://www.envoyair.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Envoy Air</a>
</div>
`,
  },
  {
    name: "Republic Airways",
    logo: "/airlines/republic.jpg",
    about:
    `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Republic Airways: Connecting the Skies</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Republic Airways Holdings, founded in 1973, is a prominent regional airline based in Indianapolis, Indiana. Operating as a key partner for major airlines like American Airlines, Delta Air Lines, and United Airlines, Republic Airways provides essential feeder services across North America. With a commitment to operational excellence and customer service, the airline plays a vital role in ensuring connectivity and convenience for travelers.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Initially established as a charter service, Republic Airways evolved into a major regional carrier through strategic acquisitions and partnerships. In 2005, it acquired the operating certificates of several airlines, including Midwest Airlines and Republic Airlines, further expanding its reach. In 2010, Republic Airways became a subsidiary of the holding company, Republic Airways Holdings, and rebranded its services to enhance the operational capabilities and branding alignment with its major airline partners.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Republic Airways operates a modern fleet of regional jets, primarily consisting of Embraer E175 and Bombardier CRJ900 aircraft. The airline’s fleet is designed for efficiency and passenger comfort, featuring comfortable seating arrangements and advanced cabin technologies. With a focus on punctuality and reliability, Republic Airways services numerous destinations across the United States, Canada, and the Caribbean, catering to both business and leisure travelers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Republic Airways prioritizes customer satisfaction and aims to provide a pleasant travel experience. The airline's cabin crew is trained to deliver exceptional service, ensuring passengers feel valued and comfortable throughout their journey. In addition to complimentary snacks and beverages, Republic Airways offers various inflight entertainment options to enhance the overall travel experience for its passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety Commitment</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is paramount at Republic Airways, which adheres to the highest industry standards and FAA regulations. The airline emphasizes rigorous training and safety protocols for its pilots and crew members to ensure operational excellence. Regular maintenance and inspections of its fleet further enhance the airline's commitment to providing a secure travel environment for passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Involvement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Republic Airways actively engages in community initiatives and supports various charitable organizations. Through its corporate social responsibility programs, the airline encourages employees to participate in community service and volunteer opportunities. By fostering strong relationships with local organizations, Republic Airways aims to contribute positively to the communities it serves.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Prospects</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Republic Airways is committed to expanding its operations and enhancing service quality. The airline plans to invest in fleet modernization and technological innovations to improve efficiency and passenger experience. With a focus on sustainability and operational excellence, Republic Airways aims to strengthen its position in the regional airline market while continuing to serve as a vital partner to major airlines.
    </p>
  </div>

  <a href="https://www.rjet.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Republic Airways</a>
</div>
`,
  },
  {
    name: "SkyWest Airlines",
    logo: "/airlines/sky-west.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">SkyWest Airlines: A Leader in Regional Air Travel</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1972, SkyWest Airlines has grown to become one of the largest regional airlines in the United States, headquartered in St. George, Utah. Operating as a key partner for major airlines, including Delta Air Lines, United Airlines, and Alaska Airlines, SkyWest Airlines plays a crucial role in connecting travelers to essential destinations across North America. Known for its commitment to safety and customer service, SkyWest Airlines is dedicated to providing a seamless travel experience for passengers.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      SkyWest Airlines began as a small charter service in 1972 and gradually expanded its operations through strategic partnerships and acquisitions. In 1986, it became a regional airline for United Airlines and later formed alliances with other major carriers. The airline adopted a code-sharing model, allowing it to operate flights under the banners of its partner airlines. Over the years, SkyWest has continued to expand its route network and fleet, establishing itself as a significant player in the regional airline market.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      SkyWest Airlines operates a diverse fleet of regional aircraft, including Bombardier CRJ900 and Embraer E175 jets. The airline focuses on efficiency and passenger comfort, offering modern amenities and spacious seating configurations. With a network that spans over 240 destinations in the United States, Canada, and Mexico, SkyWest Airlines provides essential connectivity for both leisure and business travelers. The airline's operational efficiency has earned it numerous awards for on-time performance and customer satisfaction.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      SkyWest Airlines prioritizes the customer experience by providing exceptional service and comfort on its flights. The airline offers a range of complimentary snacks and beverages, as well as options for in-flight entertainment. Passengers can also benefit from the airline's loyalty programs, which reward frequent travelers with various perks, including mileage points and upgrades. SkyWest's friendly and well-trained cabin crew is dedicated to ensuring a pleasant journey for all passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Safety</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      At SkyWest Airlines, safety is a top priority. The airline adheres to strict FAA regulations and industry best practices to ensure the safety of its passengers and crew. Pilots and flight attendants undergo rigorous training programs and regular safety drills to stay updated on the latest safety protocols. SkyWest's proactive approach to maintenance and safety checks on its aircraft further reinforces its commitment to providing a secure travel environment.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Involvement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      SkyWest Airlines actively participates in community engagement initiatives and charitable activities. The airline supports various organizations and causes, emphasizing the importance of giving back to the communities it serves. Through its corporate social responsibility programs, SkyWest encourages employees to volunteer and contribute to local charitable events, fostering strong ties with the community and demonstrating its commitment to social responsibility.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Directions</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As SkyWest Airlines looks to the future, the airline aims to continue its expansion and enhance its service offerings. Plans for fleet modernization and sustainability initiatives are in place to meet the evolving needs of travelers. By investing in innovative technologies and improving operational efficiencies, SkyWest Airlines strives to maintain its status as a leader in regional air travel while providing top-notch service to its passengers.
    </p>
  </div>

  <a href="https://www.skywest.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about SkyWest Airlines</a>
</div>
`,
  },
  {
    name: "Mesa Airlines",
    logo: "/airlines/mesa.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Mesa Airlines: A Key Player in Regional Air Travel</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Established in 1982, Mesa Airlines has become a prominent regional airline based in Phoenix, Arizona. As a vital partner to major airlines like American Airlines and United Airlines, Mesa Airlines plays a crucial role in the U.S. air travel system, providing essential connectivity to many underserved markets across North America. Known for its dedication to customer service and operational excellence, Mesa Airlines has carved a significant niche in the regional aviation landscape.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Mesa Airlines was founded in 1982 as a small airline operating regional routes. The airline initially served markets in Arizona and quickly expanded its operations through strategic partnerships with larger airlines. In 1985, Mesa became a code-sharing partner with United Airlines, marking a pivotal point in its growth. Over the years, Mesa Airlines continued to evolve, acquiring several other regional airlines and expanding its route network significantly. Today, it operates hundreds of flights daily, connecting various destinations throughout the U.S. and Canada.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Mesa Airlines operates a modern fleet of regional aircraft, including Bombardier CRJ700, CRJ900, and Embraer E175 jets. This fleet is known for its fuel efficiency and passenger comfort, enabling Mesa Airlines to serve a wide array of markets effectively. With a network covering over 100 destinations in the United States, Mexico, and Canada, Mesa Airlines provides vital connections for both business and leisure travelers. The airline prides itself on maintaining a high on-time performance rate and consistently receives positive feedback from passengers regarding its reliability.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      At Mesa Airlines, customer experience is of utmost importance. The airline strives to provide a welcoming and comfortable atmosphere for all passengers. In-flight services include complimentary snacks and beverages, ensuring travelers feel appreciated during their journeys. Additionally, Mesa Airlines participates in frequent flyer programs, allowing loyal customers to earn rewards and enjoy exclusive benefits. The airline's staff is trained to prioritize customer satisfaction, making every effort to accommodate passengers' needs and preferences.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Compliance</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Mesa Airlines places a strong emphasis on safety and compliance. The airline adheres to strict FAA regulations and guidelines to ensure the highest safety standards for its operations. All pilots and crew undergo extensive training, including regular safety drills and emergency response procedures. Mesa Airlines also implements a robust maintenance program for its aircraft, ensuring they are in optimal condition for safe operation. The airline's commitment to safety has earned it a solid reputation in the industry, instilling confidence in passengers and partners alike.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Engagement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Mesa Airlines is dedicated to being an active member of the communities it serves. The airline engages in various charitable initiatives, supporting local organizations and causes. Mesa Airlines encourages its employees to participate in community service and volunteer activities, fostering a culture of giving back. Through these efforts, the airline strengthens its ties to the communities it serves, demonstrating its commitment to corporate social responsibility.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Looking Ahead</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As Mesa Airlines continues to grow, the airline is focused on expanding its route network and enhancing its service offerings. Future plans include modernizing the fleet to include more fuel-efficient aircraft and adopting new technologies to improve operational efficiency. Mesa Airlines aims to remain a key player in regional air travel by prioritizing customer satisfaction and maintaining high safety standards while adapting to the evolving needs of travelers.
    </p>
  </div>

  <a href="https://www.mesa-air.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Mesa Airlines</a>
</div>
`,
  },
  {
    name: "Silver Airways",
    logo: "/airlines/silver.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Silver Airways: Connecting the Sunshine State and Beyond</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Silver Airways, established in 2011, is a regional airline headquartered in Fort Lauderdale, Florida. Known for its exceptional service and commitment to providing essential connectivity, Silver Airways operates scheduled flights to various destinations in Florida, the Bahamas, and beyond. With a focus on regional travel, the airline plays a vital role in enhancing connectivity to underserved markets while prioritizing customer satisfaction and operational efficiency.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Silver Airways began operations in 2011, quickly establishing itself as a reliable regional airline. The airline originally focused on routes connecting Florida with the Bahamas, catering to both business and leisure travelers. Over the years, Silver Airways has expanded its service offerings, incorporating more destinations and increasing flight frequencies. Strategic partnerships with major airlines have also allowed Silver to enhance its route network, making it easier for passengers to connect to various destinations across the United States and the Caribbean.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Silver Airways operates a modern fleet primarily consisting of ATR 42 and ATR 72 turboprop aircraft. Known for their fuel efficiency and short takeoff and landing capabilities, these aircraft are well-suited for regional routes. Silver Airways provides essential connections between major cities and smaller communities, enhancing accessibility to popular destinations. The airline operates flights to over 25 destinations, focusing on offering convenient schedules and seamless travel experiences for its passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Silver Airways is committed to providing an exceptional customer experience. The airline offers complimentary snacks and beverages on all flights, ensuring that passengers feel valued during their journeys. Silver Airways also participates in frequent flyer programs, allowing travelers to earn miles and enjoy various benefits. The airline’s friendly and attentive staff are trained to prioritize customer satisfaction, making every effort to accommodate passengers’ needs and preferences throughout their travel experience.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Compliance</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a top priority for Silver Airways. The airline adheres to stringent FAA regulations and guidelines to ensure the highest standards of safety and operational compliance. All pilots and crew undergo rigorous training, including safety drills and emergency response protocols. Silver Airways maintains a comprehensive maintenance program for its aircraft, ensuring they are in optimal condition for safe operation. The airline's commitment to safety is reflected in its operational practices and its solid reputation within the aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Engagement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Silver Airways is dedicated to supporting the communities it serves. The airline actively participates in various community initiatives and charitable events, contributing to local organizations and causes. Silver encourages its employees to engage in community service, fostering a culture of giving back. Through these efforts, Silver Airways strengthens its connection to the regions it serves, demonstrating its commitment to corporate social responsibility and community development.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Looking Ahead</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As Silver Airways continues to grow, the airline is focused on expanding its route network and enhancing service offerings. Future plans include modernizing the fleet to include more fuel-efficient aircraft and implementing new technologies to improve operational efficiency. Silver Airways aims to remain a leader in regional air travel by prioritizing customer satisfaction and maintaining high safety standards while adapting to the evolving needs of travelers.
    </p>
  </div>

  <a href="https://www.silverairways.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Silver Airways</a>
</div>
`,
  },
  {
    name: "Compass Airlines",
    logo: "/airlines/compass.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Compass Airlines: A Key Player in Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Compass Airlines, established in 2006, is a regional airline based in the United States. It primarily operates as a feeder airline for major carriers, providing essential connectivity to smaller markets across North America. With a commitment to safety, efficiency, and customer service, Compass Airlines has carved a niche in the regional aviation sector, enhancing travel options for passengers and supporting larger airlines through its network of regional routes.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Brief History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Compass Airlines commenced operations in 2006, initially focusing on providing regional services for major U.S. carriers. The airline quickly established a reputation for reliability and quality service, forming partnerships with major airlines such as Delta Air Lines and American Airlines. Over the years, Compass has expanded its operations, adapting to the changing landscape of regional aviation and meeting the demands of passengers in various markets.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Compass Airlines operates a fleet of Embraer E175 aircraft, known for their fuel efficiency and passenger comfort. The airline focuses on routes that connect major hubs with smaller communities, providing essential air service where larger carriers may not operate directly. With its modern fleet, Compass Airlines ensures that passengers enjoy a comfortable travel experience while promoting operational efficiency and environmental sustainability.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Customer satisfaction is a top priority for Compass Airlines. The airline offers complimentary beverages and snacks on all flights, creating a welcoming atmosphere for passengers. With a focus on friendly service and comfort, Compass Airlines strives to make every journey enjoyable. Passengers also benefit from seamless connections to major airlines, allowing for easy transfers and broader travel options.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Compliance</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Compass Airlines places a strong emphasis on safety and compliance with all federal regulations. The airline’s flight crews undergo rigorous training to handle various situations and emergencies, ensuring passenger safety at all times. Regular maintenance checks and adherence to FAA guidelines ensure that the fleet is always in top condition, further solidifying Compass Airlines' reputation as a safe and reliable carrier.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Involvement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Compass Airlines is committed to giving back to the communities it serves. The airline participates in various charitable initiatives and supports local organizations through sponsorships and community service. By fostering relationships within the communities, Compass Airlines aims to enhance its presence and contribute positively to the areas it connects.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Outlook</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Compass Airlines is focused on expanding its route network and improving operational efficiencies. The airline plans to modernize its fleet further and invest in new technologies to enhance the customer experience. As the aviation industry continues to evolve, Compass Airlines aims to remain a vital player in regional air travel, connecting communities and providing valuable services to its partners and passengers.
    </p>
  </div>

  <a href="https://www.flycompass.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Compass Airlines</a>
</div>
`,
  },
  {
    name: "PSA Airlines",
    logo: "/airlines/psa.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">PSA Airlines: A Leader in Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    PSA Airlines, founded in 1980, is a regional airline that operates as a subsidiary of American Airlines. Based in Dayton, Ohio, PSA Airlines serves as a vital link in American Airlines' network, providing essential regional service to numerous destinations across the United States. With a focus on safety, customer service, and operational efficiency, PSA Airlines plays a significant role in the regional aviation landscape.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">History and Growth</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      PSA Airlines started as a small airline and has grown significantly over the years. Initially operating under the name "Piedmont Airlines," it was acquired by US Airways in the 1990s and later became a regional affiliate of American Airlines in 2015. This transition allowed PSA to expand its route network and fleet size, positioning itself as a key player in American Airlines' regional operations. The airline continues to adapt and thrive within the competitive aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Services</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      PSA Airlines operates a fleet of Bombardier CRJ regional jets, specifically the CRJ-700 and CRJ-900 models. These aircraft are known for their reliability and efficiency, allowing PSA to serve a variety of regional routes effectively. The airline provides essential connectivity to American Airlines' larger network, enabling passengers to seamlessly connect to international and domestic flights. With a focus on passenger comfort and convenience, PSA Airlines ensures a high-quality travel experience.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      At PSA Airlines, customer satisfaction is paramount. The airline strives to deliver a positive travel experience through friendly service and comfortable seating. Complimentary snacks and beverages are offered on all flights, enhancing the in-flight experience. Additionally, PSA Airlines emphasizes punctuality and efficient operations, ensuring that passengers reach their destinations on time. The airline's dedication to service quality has earned it a loyal customer base.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Training</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a core value at PSA Airlines. The airline adheres to strict safety protocols and industry regulations to ensure the well-being of its passengers and crew. Comprehensive training programs for pilots and cabin crew members focus on safety procedures and emergency response. By maintaining high safety standards, PSA Airlines continues to build trust with its passengers and partners in the aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Engagement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      PSA Airlines is dedicated to giving back to the communities it serves. The airline actively participates in local initiatives and supports various charitable organizations. By engaging with the community, PSA Airlines aims to make a positive impact and strengthen its ties with the regions it connects. This commitment to community involvement reflects the airline's values and dedication to social responsibility.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Prospects</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking to the future, PSA Airlines aims to continue its growth and expansion within the regional aviation market. With plans to modernize its fleet and enhance operational efficiencies, the airline is poised to meet the evolving needs of travelers. As part of the American Airlines network, PSA Airlines will continue to play a critical role in providing essential air service, connecting communities and contributing to the overall success of American Airlines.
    </p>
  </div>

  <a href="https://www.psaairlines.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Discover more about PSA Airlines</a>
</div>
`,
  },
  {
    name: "Piedmont Airlines",
    logo: "/airlines/piedmont.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Piedmont Airlines: A Pillar of Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Piedmont Airlines, established in 1931, has long been a significant player in regional aviation in the United States. Based in Salisbury, Maryland, the airline originally started as a small carrier and has grown into a vital component of American Airlines' regional operations. With a commitment to safety, customer service, and operational excellence, Piedmont Airlines serves many important routes, connecting passengers to major cities across the country.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Rich History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Founded by Richard H. McCoy, Piedmont Airlines began as a small airline serving routes in the Carolinas. Over the decades, it expanded significantly, acquiring several regional airlines and enhancing its fleet. In 1989, Piedmont was acquired by USAir, which later became US Airways. In 2013, after the merger of US Airways and American Airlines, Piedmont became a regional affiliate of American Airlines, allowing it to leverage a larger network and resources.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Piedmont Airlines operates a fleet primarily consisting of Bombardier CRJ regional jets, specifically the CRJ-200, CRJ-700, and CRJ-900 models. These aircraft are designed for short-haul flights, offering efficiency and reliability. As a regional carrier, Piedmont plays a critical role in providing connectivity to American Airlines' larger routes, ensuring that passengers can easily transfer between regional and international flights.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Service</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      At Piedmont Airlines, the focus on customer service is paramount. The airline prides itself on providing a welcoming and comfortable travel experience. Passengers can expect friendly service from a dedicated crew, along with complimentary snacks and beverages on flights. Piedmont Airlines emphasizes punctuality and strives to minimize delays, ensuring that travelers can reach their destinations as scheduled.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety Standards</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a cornerstone of Piedmont Airlines' operations. The airline adheres to strict safety protocols and regulatory requirements established by the Federal Aviation Administration (FAA). Pilots and crew undergo extensive training to prepare for various scenarios, emphasizing safety and emergency preparedness. This commitment to safety ensures that passengers can travel with confidence when flying with Piedmont Airlines.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Involvement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Piedmont Airlines is dedicated to making a positive impact in the communities it serves. The airline actively participates in local initiatives and charitable efforts, supporting various causes that enhance the quality of life for residents. By engaging with the community, Piedmont Airlines aims to strengthen its ties and demonstrate its commitment to social responsibility.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Directions</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As Piedmont Airlines looks to the future, it remains focused on growth and operational improvements. The airline plans to modernize its fleet and enhance its services to meet the changing needs of travelers. With a strong foundation as part of the American Airlines network, Piedmont Airlines is well-positioned to continue serving its regional routes effectively and efficiently.
    </p>
  </div>

  <a href="https://www.piedmont-airlines.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Piedmont Airlines</a>
</div>
`,
  },
  {
    name: "Air Wisconsin",
    logo: "/airlines/wisconsin.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Air Wisconsin: A Commitment to Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Air Wisconsin Airlines Corporation, founded in 1965, has been a key player in regional aviation in the United States. Based in Appleton, Wisconsin, Air Wisconsin has built a reputation for reliability and quality service. As a regional airline, it operates under the American Eagle brand, providing essential connectivity to passengers across various routes, including many small and medium-sized markets that might otherwise be underserved.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Journey Through History</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Originally established as a charter airline, Air Wisconsin quickly expanded its operations. In the late 1980s, the airline began serving as a feeder for larger carriers, ultimately partnering with United Airlines and American Airlines. This strategic shift enabled Air Wisconsin to broaden its route network and enhance its service offerings. The airline's long-standing affiliation with American Airlines solidified its role in regional transportation and paved the way for future growth.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet Overview</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Air Wisconsin operates a modern fleet consisting primarily of Bombardier CRJ-200 and CRJ-700 regional jets. These aircraft are well-suited for short to medium-haul flights, providing passengers with a comfortable travel experience. The airline emphasizes operational efficiency and safety, ensuring that its fleet is maintained to the highest standards. By utilizing modern equipment, Air Wisconsin can offer reliable services to its regional markets.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Customer-Centric Approach</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Air Wisconsin places a strong emphasis on customer service. With a friendly and professional crew, the airline strives to create a positive travel experience for all passengers. From the check-in process to in-flight services, Air Wisconsin aims to meet and exceed customer expectations. Complimentary snacks and beverages are provided on flights, enhancing the overall journey for travelers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety First</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a top priority for Air Wisconsin. The airline adheres to strict safety regulations set forth by the Federal Aviation Administration (FAA) and conducts regular training for its pilots and crew. This commitment to safety ensures that passengers can travel with peace of mind, knowing they are in capable hands. Air Wisconsin’s emphasis on safety contributes to its reputation as a trustworthy regional carrier.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Engagement</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Air Wisconsin is dedicated to being an active participant in the communities it serves. The airline supports various local initiatives, charitable organizations, and events. By fostering strong community ties, Air Wisconsin enhances its reputation and demonstrates its commitment to social responsibility. This engagement not only benefits the communities but also strengthens the airline's brand and customer loyalty.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Prospects</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Air Wisconsin aims to expand its route network and enhance its services further. The airline is focused on operational improvements and fleet modernization, positioning itself to meet the evolving needs of regional travelers. As part of the American Airlines network, Air Wisconsin is well-equipped to provide essential connectivity and maintain its role in regional aviation.
    </p>
  </div>

  <a href="https://www.airwis.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Air Wisconsin</a>
</div>
`,
  },
  {
    name: "GoJet Airlines",
    logo: "/airlines/gojet.jpg",
    about:
     `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">GoJet Airlines: Elevating Regional Travel</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    GoJet Airlines, a prominent regional carrier based in St. Louis, Missouri, was founded in 2004. It operates as a vital partner for major airlines, providing essential connectivity to various destinations across the United States. Known for its commitment to service excellence, GoJet has carved out a niche in the competitive regional airline market, facilitating travel for millions of passengers each year.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">History and Development</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      GoJet Airlines began its journey by focusing on regional routes, establishing partnerships with major airlines like United and Delta. Over the years, the airline has expanded its operations significantly, increasing the number of destinations it serves. GoJet’s growth reflects its dedication to meeting the needs of regional travelers and its ability to adapt to the changing dynamics of the aviation industry.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      The airline operates a fleet of Bombardier CRJ regional jets, known for their efficiency and comfort on short-haul flights. These aircraft are ideal for regional travel, allowing GoJet to provide seamless connections to larger hubs. The airline's focus on maintaining a modern fleet ensures that passengers experience reliable and comfortable service.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Customer Service</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      GoJet Airlines prides itself on delivering outstanding customer service. The airline’s staff is trained to provide a welcoming atmosphere, ensuring that passengers feel valued from check-in to arrival. Complimentary snacks and beverages enhance the travel experience, reflecting GoJet's commitment to customer satisfaction. Feedback from passengers indicates a high level of satisfaction with the airline's service quality.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Safety and Reliability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a paramount concern for GoJet Airlines. The airline adheres to stringent safety protocols and regulations set forth by the Federal Aviation Administration (FAA). Regular maintenance and inspections of aircraft are integral to its operations, ensuring a safe flying experience for passengers. GoJet's dedication to safety has earned it a solid reputation in the aviation community.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Community Engagement and Sustainability</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      GoJet Airlines actively engages with the communities it serves. The airline participates in various local initiatives and supports charitable organizations, demonstrating a commitment to social responsibility. Additionally, GoJet is focused on sustainability, implementing practices aimed at reducing its environmental footprint. These efforts reflect the airline's awareness of its role in fostering positive community relations and promoting environmental stewardship.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Looking Ahead</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As GoJet Airlines looks to the future, it remains committed to enhancing its services and expanding its route network. The airline aims to leverage technology and innovation to improve operational efficiency and customer experience. By continuing to adapt to the evolving aviation landscape, GoJet is poised to maintain its position as a leading regional carrier.
    </p>
  </div>

  <a href="https://www.gojetairlines.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Discover more about GoJet Airlines</a>
</div>
`,
  },
  {
    name: "Trans States Airlines",
    logo: "/airlines/tsa-tsa.jpg",
    about:
    `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Trans States Airlines: A Legacy in Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1982, Trans States Airlines was a regional airline based in St. Louis, Missouri. It played a crucial role in providing connectivity across the Midwest and beyond, operating flights for major carriers such as United Airlines and American Airlines. Known for its commitment to service and operational excellence, Trans States Airlines became a key player in the regional aviation market before ceasing operations in 2019.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Historical Background</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Trans States Airlines began as a small commuter airline focused on filling the gap in regional air travel. It quickly grew by establishing codeshare agreements with larger airlines, expanding its network and passenger base. The airline's early years were marked by significant growth as it capitalized on the increasing demand for regional flights, connecting underserved areas to major airports.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      At its peak, Trans States Airlines operated a fleet of Bombardier CRJ-200 and CRJ-700 regional jets. These aircraft were known for their efficiency and comfort, catering to both business and leisure travelers. The airline's operational focus was on short-haul flights, providing essential links to major hubs, which helped facilitate seamless travel for connecting passengers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Safety and Service</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety was a core principle at Trans States Airlines. The airline adhered to rigorous safety standards and maintenance protocols, ensuring a reliable travel experience for its passengers. In addition to safety, the airline was recognized for its commitment to customer service, with a focus on creating a pleasant flying experience through attentive staff and comfortable flights.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Challenges and Transition</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Despite its successes, Trans States Airlines faced challenges due to increasing competition and changing market dynamics in the aviation industry. The rise of low-cost carriers and fluctuations in fuel prices affected profitability. Ultimately, the airline ceased operations in April 2019, marking the end of an era in regional aviation.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Legacy and Impact</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      The legacy of Trans States Airlines continues through its contributions to regional air travel. The airline helped establish vital connections in the Midwest and played a significant role in the development of regional aviation standards. Many former employees and customers remember the airline fondly, recognizing its impact on the communities it served.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future of Regional Aviation</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Following the closure of Trans States Airlines, the regional aviation landscape has continued to evolve. New regional carriers have emerged, focusing on innovation and customer service to meet the needs of travelers. The lessons learned from Trans States Airlines' experience remain relevant as the industry navigates challenges and opportunities in a competitive market.
    </p>
  </div>

  <a href="https://www.transstatesairlines.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Trans States Airlines</a>
</div>
`,
  },
  {
    name: "ExpressJet Airlines",
    logo: "/airlines/express.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">ExpressJet Airlines: A Leader in Regional Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Established in 1986, ExpressJet Airlines has been a significant player in the regional airline industry, providing vital connections for major U.S. carriers. Based in Atlanta, Georgia, ExpressJet was known for its operational reliability and customer service, operating flights under brands like United Express and Delta Connection until it ceased operations in 2020.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Historical Overview</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      ExpressJet Airlines began as a small airline operating regional routes. Through strategic partnerships and codeshare agreements, it rapidly expanded its service offerings. By the late 1990s, ExpressJet became known for its efficient operations and commitment to customer satisfaction, which helped it secure contracts with larger carriers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet and Operations</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      At its height, ExpressJet operated a diverse fleet of Embraer ERJ145 aircraft, known for their efficiency and comfort. The airline primarily served short-haul routes, providing essential links between smaller regional airports and major hubs, facilitating smooth connections for travelers.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Safety and Service</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety was paramount at ExpressJet Airlines. The airline adhered to strict safety regulations and maintenance procedures, ensuring that passengers could fly with confidence. Additionally, ExpressJet focused on providing excellent customer service, training staff to prioritize passenger needs and enhance the flying experience.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Challenges and Closure</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Despite its successes, ExpressJet Airlines faced significant challenges, including fluctuating fuel prices, increased competition from low-cost carriers, and the impact of the COVID-19 pandemic. Ultimately, the airline ceased operations in September 2020, marking a significant loss for regional air travel.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Legacy and Influence</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      ExpressJet Airlines left a lasting legacy in regional aviation. Its commitment to safety and service set a standard for regional carriers. Former employees and passengers alike remember the airline for its significant contributions to the industry and its role in connecting communities across the United States.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future of Regional Airlines</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      The closure of ExpressJet Airlines has prompted discussions about the future of regional aviation. New airlines are emerging, focusing on innovative solutions and customer-centric services to meet the needs of travelers. The evolution of regional air travel continues as the industry adapts to changing demands and market conditions.
    </p>
  </div>

  <a href="https://www.expressjet.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about ExpressJet Airlines</a>
</div>
`,
  },
  {
    name: "Cape Air",
    logo: "/airlines/cap.jpg",
    about:
      `<div class="max-w-2xl mx-auto px-6 py-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Cape Air: Connecting Communities Through Aviation</h1>

  <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Founded in 1989, Cape Air has grown into a prominent regional airline, dedicated to serving small communities across the United States and the Caribbean. With a focus on safety, reliability, and exceptional customer service, Cape Air connects passengers to essential destinations, fostering economic growth and enhancing accessibility.
  </p>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">A Historical Perspective</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Cape Air started with a single Cessna 402 aircraft, providing service between Cape Cod and Nantucket. Over the years, the airline expanded its fleet and routes, responding to the growing demand for regional air travel. By the mid-2000s, Cape Air had established a significant presence in New England, the Midwest, and the Caribbean.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Fleet Overview</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Cape Air operates a fleet primarily composed of Cessna 402 and Tecnam P2012 aircraft, known for their versatility and efficiency. The airline focuses on providing quick and comfortable flights, making it an ideal choice for travelers seeking to connect to larger airports or enjoy scenic routes.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Commitment to Safety</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Safety is a cornerstone of Cape Air's operations. The airline adheres to stringent maintenance and operational protocols to ensure passenger safety. Regular training for pilots and crew members emphasizes the importance of safety in every flight, contributing to Cape Air's strong safety record.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Exceptional Customer Experience</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Cape Air prides itself on delivering a customer-centric experience. With friendly and attentive staff, the airline aims to create a welcoming atmosphere for travelers. The convenience of flying into smaller airports allows passengers to enjoy a hassle-free travel experience, avoiding the congestion of larger terminals.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Environmental Responsibility</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      As part of its commitment to sustainability, Cape Air is focused on reducing its environmental footprint. The airline has implemented initiatives to enhance fuel efficiency and minimize emissions. By investing in new aircraft and optimizing flight operations, Cape Air aims to contribute positively to the communities it serves.
    </p>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Future Outlook</h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Looking ahead, Cape Air is dedicated to expanding its route network and enhancing its services. The airline plans to explore new markets while continuing to provide reliable transportation for its loyal customers. With a focus on community engagement and customer satisfaction, Cape Air is poised for continued success in regional aviation.
    </p>
  </div>

  <a href="https://www.capeair.com" class="text-blue-600 dark:text-blue-400 underline mt-4 block">Learn more about Cape Air</a>
</div>
`,
  },
];

export default function Airlines() {
  return (
    <div className="bg-[#f5f7fa] dark:bg-[#b3b3b3] md:p-10">
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
              className="bg-white dark:bg-black rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
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
