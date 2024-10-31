"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function Article() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const stories = [
    {
      category: "STAYS",
      title: "How to Explain Travel to a Five-Year-Old",
      description:
        "I've been a traveler my whole life — and was lucky enough to have a family that prioritized experiencing new destinations throughout my childhood. Now, it's my nephew's turn. At two years old, with seven countries down, he's on his way to becoming a citizen of the world.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "HOTEL",
      title: "Pure Luxe in Punta Mita the original contained",
      description:
        "In this week's interview, Ole ter Wey talks to climate activist Grace Fong about the importance of climate education. Drawing on her very personal experiences with the impacts of climate change in her home country of Fiji",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "TRAVEL",
      title: "All Aboard the Rocky Mountaineer",
      description:
        "In this interview, correspondent Polly Nash talks to fire fighter Cami Schafer about one of the many frightening effects of climate change; the ever-growing threat of wildfires around the world. Last year California was hit by the Dixie Fire, the largest single forest fire in the state's history.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "BOOKING",
      title: "The Castle on the Cliff: Majestic, Magic, Manoir",
      description:
        "Thousands of migrants — of whom, many are children — suffer from deadly heat conditions at the US-Mexico border. As the effects of climate change worsen day by day, extreme weather conditions are causing a high risk of dehydration and death amongst migrants who try to enter the States.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "STAYS",
      title: "Adventure in the Amazon Rainforest",
      description:
        "Explore the depths of the Amazon rainforest with our expert guides. Experience the rich biodiversity and learn about conservation efforts to protect this vital ecosystem.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "HOTEL",
      title: "Luxury Stays in the Maldives",
      description:
        "Discover paradise in the Maldives with overwater bungalows and pristine beaches. Experience world-class service and unforgettable sunsets in this tropical haven.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "TRAVEL",
      title: "Historic Tour of Ancient Rome",
      description:
        "Step back in time with our comprehensive tour of Ancient Rome. Visit the Colosseum, Roman Forum, and hidden gems that tell the story of this eternal city.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      category: "BOOKING",
      title: "Safari Adventure in Tanzania",
      description:
        "Witness the great migration and experience the thrill of safari in Tanzania's renowned national parks. Get up close with Africa's most magnificent wildlife.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(stories.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
  };

  // Get all pages content
  const getPages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const start = i * itemsPerPage;
      const end = start + itemsPerPage;
      pages.push(stories.slice(start, end));
    }
    return pages;
  };

  return (
    <div className="px-6 py-12 lg:py-24 w-3/4 mx-auto">
      <div className="container relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">Articles</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {getPages().map((page, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {page.map((story, storyIndex) => (
                    <Card key={storyIndex} className="border shadow-lg rounded-xl">
                      <CardContent className="p-0">
                        <div className="aspect-[4/3] relative mb-4">
                          <Link href={"/"}>
                            <Image
                              layout="fill"
                              src={'/Nevada.jpeg'}
                            //   src={story.image}
                              alt=""
                              className="object-cover   w-full h-full rounded-t-xl"
                            />
                          </Link>
                        </div>
                        <div className="p-4">
                          {" "}
                          <Badge
                            variant="outline"
                            className="mb-3 font-semibold dark:text-white"
                          >
                            {story.category}
                          </Badge>
                          <Link href={"/"}>
                            <h3 className="text-xl font-bold mb-3 hover:text-blue-400 dark:text-white">
                              {story.title}
                            </h3>
                          </Link> 
                          <p className="text-muted-foreground line-clamp-3 dark:text-white">
                            {story.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-2 h-2 p-0 rounded-full ${
                currentPage === index ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
