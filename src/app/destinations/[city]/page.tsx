import Navbar from '@/components/Common/Navbar';
import { getDetailedCity } from '@/services/cities';
import React, { Fragment } from 'react';
import Displayer from './_components/Displayer';
import Footer from '@/components/Common/Footer';

type Params = Promise<{ city: string }>

export default async function Page(props: { params: Params }) {

    const { city } = await props.params; // No await here

    const formattedTitle = city
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const destination = await getDetailedCity(formattedTitle);
    console.log('first destination ', destination);

    return (
        <Fragment>
            <Navbar />
            {destination && destination[0] ? <Displayer destination={destination} /> : null}
            <Footer />
        </Fragment>
    );
}