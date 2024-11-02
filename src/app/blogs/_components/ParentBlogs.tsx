import React, { Fragment } from 'react'
import BlogPostForm from './BlogPostForm'
import { BlogPostType } from '@/types/blogs'
import { User } from '@/types/user'

export default function ParentBlogs({blogs,user}:{blogs:BlogPostType[],user:User}) {
  return (
   <Fragment>
    <BlogPostForm user={user} blogs={blogs} />
   </Fragment>
  )
}
