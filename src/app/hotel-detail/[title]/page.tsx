import React, { Fragment } from 'react'
import ParentDetails from './_components/ParentDetails'
import Navbar from '@/components/Common/Navbar';
import Footer from '@/components/Common/Footer';

export default async function Page() {
// export default async function Page({ params }: { params: { title: string } }) {
    // const { title } = await params

//   const formateTitle = title
//     .split("_")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

  return (
    <Fragment>
        <Navbar />
      <ParentDetails />
      <Footer />
    </Fragment>
  );
}
