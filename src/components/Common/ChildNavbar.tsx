"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  LogInIcon,
  LogOutIcon,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { HotelType } from "@/types/hotels";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { User } from "@/types/user";
import { TourTypes } from "@/types/tours";
import { ActivityTypes } from "@/types/activity";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navItems = [
  // {
  //   title: "Hotel",
  //   items: ["Luxury", "Budget", "Resort", "Apartment"],
  // },
  // {
  //   title: "Tour",
  //   items: ["City Tours", "Adventure Tours", "Cultural Tours", "Food Tours"],
  // },
  // {
  //   title: "Activity",
  //   items: ["Sightseeing", "Water Sports", "Hiking", "Nightlife"],
  // },
  {
    title: "Rental",
    items: ["Economy", "SUV", "Luxury", "Van"],
  },
  {
    title: "Car",
    items: ["Economy", "SUV", "Luxury", "Van"],
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChileNavbar({
  user,
  hotels,
  tours,
  activity,
}: {
  user: User;
  hotels: HotelType[];
  tours: TourTypes[];
  activity: ActivityTypes[];
}) {
  console.log("useruseruser", user);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // Always show the navbar when at the top of the page
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down, hide the navbar
        setShowNavbar(false);
      } else {
        // Scrolling up, show the navbar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", `${newValue}`);
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newValue;
    });
  };
  return (
    <Fragment>
      {/* <nav className="bg-white shadow dark:bg-[#1E1E1E] dark:text-white  dark:border-b dark:border-gray-300"> */}
      <nav
        className={`fixed top-0 left-0 w-full bg-white shadow z-50 dark:bg-[#1E1E1E] dark:text-white dark:border-b dark:border-gray-300 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3"
                >
                  <Image
                    src={"/journey-verse.png"}
                    width={30}
                    height={30}
                    alt="journey-verse-logo"
                  />
                  <span> Journey Verse</span>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              {user?.email ? (
                <Link
                  href={
                    user?.image === "admin" ? "/dashboard/home" : "/dashboard/overview"
                  }
                  className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </Link>
              ) : null}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white hover:bg-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Hotels <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {hotels.map((subItem) => (
                    <DropdownMenuItem
                      className="dark:bg-black dark:text-white bg-white hover:bg-white hover:text-blue-500"
                      key={subItem.id}
                    >
                      <Link
                        href={`/hotel-detail/${formatForUrlWith_under_score(
                          subItem.title
                        )}`}
                        className="hover:text-blue-600"
                      >
                        {subItem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white hover:bg-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Tours <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {tours.map((subItem) => (
                    <DropdownMenuItem
                      className="dark:bg-black dark:text-white bg-white hover:bg-white hover:text-blue-500"
                      key={subItem.id}
                    >
                      <Link
                        href={`/tour-detail/${formatForUrlWith_under_score(
                          subItem.title
                        )}`}
                        className="hover:text-blue-600"
                      >
                        {subItem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white hover:bg-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Activity <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {activity.map((subItem) => (
                    <DropdownMenuItem
                      className="dark:bg-black dark:text-white bg-white hover:bg-white hover:text-blue-500"
                      key={subItem.id}
                    >
                      <Link
                        href={`/activity_detail/${formatForUrlWith_under_score(
                          subItem.title
                        )}`}
                        className="hover:text-blue-600"
                      >
                        {subItem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white hover:bg-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Rental <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {hotels.map((subItem) => (
                    <DropdownMenuItem
                      className="dark:bg-black dark:text-white bg-white hover:bg-white hover:text-blue-500"
                      key={subItem.id}
                    >
                      <Link
                        href={`/hotel-detail/${formatForUrlWith_under_score(
                          subItem.title
                        )}`}
                        className="hover:text-blue-600"
                      >
                        {subItem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white hover:bg-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Car <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {activity.map((subItem) => (
                    <DropdownMenuItem
                      className="dark:bg-black dark:text-white bg-white hover:bg-white hover:text-blue-500"
                      key={subItem.id}
                    >
                      <Link
                        href={`/activity_detail/${formatForUrlWith_under_score(
                          subItem.title
                        )}`}
                        className="hover:text-blue-600"
                      >
                        {subItem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/all_blogs"
                className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Blogs
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun /> : <Moon />}
              </Button>
              {/* <Button
              variant="ghost"
              size="icon"
              onClick={user?.email ? () => signOut() : undefined}
            > */}
              {/* {user?.email ? (
                <LogOutIcon className="h-5 w-5" />
              ) : (
                <Link href="/login">
                  <LogInIcon className="h-5 w-5" />
                </Link>
              )} */}
              {user?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        {user.image && user.image !== "admin" && user.image !== "user" ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Fragment>
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className={getRandomColor()}>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Fragment>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-white rounded-xl border-gray-400"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuItem className="font-normal bg-white">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                      </div>
                    </DropdownMenuItem>
                    <hr className="border-gray-400" />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={user?.email ? () => signOut() : undefined}
                    >
                      <LogOutIcon className="h-5 w-5" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon">
                    <LogInIcon className="h-5 w-5" />
                    <span className="sr-only">Log in</span>
                  </Button>
                </Link>
              )}
              {/* <span className="sr-only">User profile</span>
            </Button> */}
            </div>
            <div className="flex items-center sm:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun /> : <Moon />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={user?.email ? () => signOut() : undefined}
                >
                  {user?.email ? (
                    <LogOutIcon className="h-5 w-5" />
                  ) : (
                    <Link href="/login">
                      <LogInIcon className="h-5 w-5" />
                    </Link>
                  )}
                  <span className="sr-only">User profile</span>
                </Button>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 dark:text-white"
                  >
                    <Menu className="h-50 w-50" />
                    <span className="sr-only">Open main menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] bg-white overflow-scroll"
                >
                  <SheetTitle className="mt-[-15px] mb-5 flex items-center">
                    <Image
                      src={"/journey-verse.png"}
                      width={50}
                      height={50}
                      alt="journey-verse-logo"
                    />
                    Journey Verse
                  </SheetTitle>
                  <nav className="flex flex-col gap-4">
                    <Link
                      href="/"
                      className="text-gray-900 block dark:text-white  text-base font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    {navItems.map((item) => (
                      <div key={item.title} className="space-y-1">
                        <h3 className=" text-sm font-bold text-gray-800 dark:text-white">
                          {item.title}
                        </h3>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`/${item.title.toLowerCase()}/${subItem
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="text-gray-900 dark:text-white block px-3 py-2 text-base font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
