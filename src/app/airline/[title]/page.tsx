import Footer from '@/components/Common/Footer'
import Navbar from '@/components/Common/Navbar'
import React, { Fragment } from 'react'
import AirlineDisplay from './_components/AirlineDisplay'
import { airlines } from '@/components/Airlines'

type Params = Promise<{ title: string }>

export default async function Page(props: { params: Params }) {
    const { title } = await props.params;
    
  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
    const airline = airlines?.find((airline) => airline?.name === formateTitle)
  return (
    <Fragment>
        <Navbar />
        <AirlineDisplay airline={airline} />
        <Footer />
    </Fragment>
  )
}
