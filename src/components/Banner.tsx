import Image from "next/image";
import SearchForm from "./Common/SearchForm";

export default function Banner() {

  return (
    <div className="relative  min-h-[400px] w-full overflow-hidden dark:border-b">
      <div className="absolute inset-0">
        <Image
          layout="fill"
          alt="Mountain landscape with a person in yellow jacket"
          className="w-full h-full object-cover"
          src="/journey-bg.jpeg"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center md:mt-40  text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Let the journey begin
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Get the best prices on 5,000,00000+ properties, worldwide
        </p>
        <nav className="mb-4 mt-10">
          <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            {[
              "Hotel",
              // "Tours",
              // "Activity",
              // "Rental",
              // "Cars Rental",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline font-bold">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <SearchForm />
      </div>
    </div>
  );
}
