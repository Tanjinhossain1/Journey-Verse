import Navbar from '@/components/Common/Navbar'
import React, { Fragment } from 'react'
import AllBlogDisplay from './_components/BlogDisplayer'
import Footer from '@/components/Common/Footer'

export default function page() {
  return (
    <Fragment>
        <Navbar />
        <AllBlogDisplay />
        <Footer />
    </Fragment>
  )
}
