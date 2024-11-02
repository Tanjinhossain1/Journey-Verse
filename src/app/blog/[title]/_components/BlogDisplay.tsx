"use client";
import { BlogPostType } from "@/types/blogs";
import Image from "next/image";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateDates, formatForUrlWith_under_score } from "@/utils/utils";
import { MdPreview } from "md-editor-rt";

import "md-editor-rt/lib/style.css";
import Link from "next/link";

export default function BlogDisplay({
  blog,
  popularPost,
}: {
  blog: BlogPostType;
  popularPost: BlogPostType[];
}) {
  return (
    <Fragment>
      <div className="relative  min-h-[200px] w-full overflow-hidden dark:border-b">
        <div className="absolute inset-0">
          <Image
            layout="fill"
            alt="Mountain landscape with a person in yellow jacket"
            className="w-full h-full object-cover"
            src="/journey-bg.jpeg"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col w-3/4 mx-auto md:mt-28 text-white px-4">
          <h1 className="text-4xl md:text-4xl font-bold mb-4 text-left">
            Let the journey begin
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator /> */}
              {/* <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/search-hotel?location_name=${blog?.country}`}
                >
                  {blog?.country}
                </BreadcrumbLink>
              </BreadcrumbItem> */}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="w-3/4 mx-auto">
        <div className="border border-gray-100 md:grid md:grid-cols-3">
          <div className="col-span-2 mx-auto">
            <Image
              width={800}
              height={800}
              alt="Mountain landscape with a person in yellow jacket"
              src={blog.image}
            />
            {/* <h2 className="text-lg border w-[60px] font-bold mb-4 p-1 ">{blog.category}</h2> */}
            <Badge className="border border-green-700 my-1">
              {blog.category}
            </Badge>

            <p className="text-sm mt-2 text-gray-600">
              Uploaded By:{" "}
              <span className="ml-2">
                <b>"</b>
                {blog.username}
                <b>"</b>
              </span>{" "}
              <b className="ml-2">IN</b>{" "}
              <span className=" text-gray-800">
                {formatDate(blog.createdAt)}
              </span>{" "}
            </p>
            <p className="bg-blue-50 p-2 rounded-xl mt-2">{blog.description}</p>
            <MdPreview modelValue={blog.content} />
          </div>
          <div className="col-span-1">
            <div className="bg-blue-50 mt-2 ml-2 p-4 mr-2 rounded-2xl">
              <p className="text-2xl font-bold mb-4">Popular Post</p>
              <hr className="text-gray-500" />
              {popularPost?.map((post) => {
                return (
                  <Fragment key={post.id}>
                    <div className="mt-2 flex gap-4">
                      <Image
                        width={100}
                        height={100}
                        alt={post.title}
                        src={blog.image}
                      />
                     <div>
                     <Link className="hover:text-blue-600 text-lg" href={`/blog/${formatForUrlWith_under_score(post.title)}`}>
                      <p>{post.title}</p>
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">{formatDateDates(post.createdAt)}</p>
                     </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
