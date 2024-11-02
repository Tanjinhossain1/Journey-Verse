import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { getBlogsByTitle, getBlogsWIthoutSelected } from "@/services/blogs";
import BlogDisplay from "./_components/BlogDisplay";
import { BlogPostType } from "@/types/blogs";

type Params = Promise<{ title: string }>

export default async function Page(props: { params: Params }) {
  const { title } = await props.params;

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
    const blog = await getBlogsByTitle(formateTitle)
    const PopularPost = await getBlogsWIthoutSelected(formateTitle)
  return (
    <Fragment>
      <Navbar />
       <BlogDisplay popularPost={PopularPost as BlogPostType[]} blog={blog[0] as BlogPostType} />
      <Footer />
    </Fragment>
  );
}
