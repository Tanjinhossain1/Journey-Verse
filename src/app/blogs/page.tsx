import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import ParentBlogs from "./_components/ParentBlogs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getBlogsByEmail } from "@/services/blogs";
import { BlogPostType } from "@/types/blogs";
import { User } from "@/types/user";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");
    const blogs = await getBlogsByEmail(session?.user?.email);

  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Blog Post">
        <ParentBlogs user={session.user as User} blogs={blogs as BlogPostType[]} />
      </DashboardLayout>
    </Fragment>
  );
}
