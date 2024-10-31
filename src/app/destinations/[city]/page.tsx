import Navbar from '@/components/Common/Navbar';
import { getDetailedCity } from '@/services/cities';
import React, { Fragment } from 'react'
import Displayer from './_components/Displayer';
import Footer from '@/components/Common/Footer';

export default async function page({params}:{params:{city:string}}) {
    const { city } = await params
    const formateTitle = city
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    const destination = await getDetailedCity(formateTitle);
    console.log('first destination ',destination)
  return (
     <Fragment>
        <Navbar />
        {
            destination && destination[0] ? 
            <Displayer destination={destination} />
        : null}
        <Footer />
     </Fragment>
  )
}
