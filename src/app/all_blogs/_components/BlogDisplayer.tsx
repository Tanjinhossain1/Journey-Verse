'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getBlogs } from "@/services/blogs"
import { formatForUrlWith_under_score } from "@/utils/utils"

type Blog = {
  email: string
  id: number
  title: string
  content: string
  image: string
  createdAt: Date
  updatedAt: Date
  description: string | null
  category: string
  username: string
}

type BlogResponse = {
  data: Blog[]
  total: number
}

export default function AllBlogDisplay() {
  const [page, setPage] = useState(1)
  const [blogData, setBlogData] = useState<BlogResponse>({ data: [], total: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 12

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true)
      try {
        const response = await getBlogs(page, itemsPerPage)
        setBlogData(response)
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [page])

  const totalPages = Math.ceil(blogData.total / itemsPerPage)

  return (
    <div className="container mx-auto py-8 px-4 dark:text-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(itemsPerPage).fill(null).map((_, index) => (
              <Card key={index} className="h-full">
                <div className="aspect-video">
                  <Skeleton className="w-full h-full text-black bg-black dark:bg-white" />
                </div>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-black dark:bg-white" />
                  <Skeleton className="h-6 w-full bg-black dark:bg-white" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full bg-black dark:bg-white" />
                  <Skeleton className="h-4 w-full mt-2 bg-black dark:bg-white" />
                  <Skeleton className="h-4 w-2/3 mt-2 bg-black dark:bg-white" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-full bg-black dark:bg-white" />
                </CardFooter>
              </Card>
            ))
          : blogData.data.map((blog) => (
              <Link href={`/blog/${formatForUrlWith_under_score(blog.title)}`} key={blog.id}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="space-y-2">
                    <Badge variant="secondary" className="w-fit border border-gray-400">
                      {blog.category}
                    </Badge>
                    <h2 className="text-2xl font-bold leading-tight line-clamp-2 hover:text-blue-600">
                      {blog.title}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {blog.description || blog.content}
                    </p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between w-full">
                      <span><span className="text-[12px] text-gray-500">Upload By:</span> {blog.username}</span>
                      <time dateTime={blog.createdAt.toISOString()}>
                        {format(blog.createdAt, 'MMM d, yyyy')}
                      </time>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || isLoading}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}