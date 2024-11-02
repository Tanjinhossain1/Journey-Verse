"use client";
import { useEffect, useState } from "react";
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

const navItems = [
  {
    title: "Hotel",
    items: ["Luxury", "Budget", "Resort", "Apartment"],
  },
  {
    title: "Tour",
    items: ["City Tours", "Adventure Tours", "Cultural Tours", "Food Tours"],
  },
  {
    title: "Activity",
    items: ["Sightseeing", "Water Sports", "Hiking", "Nightlife"],
  },
  {
    title: "Rental",
    items: ["Economy", "SUV", "Luxury", "Van"],
  },
  {
    title: "Car",
    items: ["Economy", "SUV", "Luxury", "Van"],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChileNavbar({ user }: { user: any }) {
  console.log("useruseruser", user);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <nav className="bg-white shadow dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-800 dark:text-white"
              >
                Journey Verse
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
            {
              user?.email ?  <Link
              href="/myProfile"
              className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Dashboard
            </Link> : null
            }
            {navItems.map((item) => (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  {item.title} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.items.map((subItem) => (
                    <DropdownMenuItem
                      className="dark:bg-black dark:text-white bg-white"
                      key={subItem}
                    >
                      <Link
                        href={`/${item.title.toLowerCase()}/${subItem
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {subItem}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
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
                <SheetTitle className="mt-[-15px] mb-5">
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
  );
}
