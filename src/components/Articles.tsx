"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { BlogPostType } from "@/types/blogs";
import { getBlogs } from "@/services/blogs";
import { formatForUrlWith_under_score } from "@/utils/utils";

export default function Article() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [stories, setStories] = React.useState<BlogPostType[]>([]);

  React.useEffect(()=>{
    const fetchArticles = async () =>{
      const articles = await getBlogs(1,12);
      setStories(articles.data as BlogPostType[]);
    }
    fetchArticles()
  },[])

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
              className="rounded-full dark:text-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full dark:text-white"
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
              <div key={pageIndex} className="w-full flex-shrink-0 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {page.map((story, storyIndex) => (
                    <Card key={storyIndex} className="border dark:border-gray-400 shadow-lg rounded-xl">
                      <CardContent className="p-0">
                        <div className="aspect-[4/3] relative mb-4">
                          <Link href={`/blog/${formatForUrlWith_under_score(story?.title)}`}>
                            <Image
                              layout="fill"
                              src={story.image}
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
                            className="mb-3 font-semibold dark:text-gray-300"
                          >
                            {story.category}
                          </Badge>
                          <Link href={`/blog/${formatForUrlWith_under_score(story?.title)}`}>
                            <h3 className="text-xl font-bold mb-3 hover:text-blue-400 dark:text-gray-300">
                              {story.title}
                            </h3>
                          </Link> 
                          <p className="text-muted-foreground line-clamp-3 dark:text-gray-300">
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
          <div className="text-end mt-2"><Link className="mt-2 underline font-semibold text-blue-500" href={'/all_blogs'}>List Of Blogs</Link></div>

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
