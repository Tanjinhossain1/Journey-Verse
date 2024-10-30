import DashboardLayout from '@/components/Common/DashboardLayout'
import Navbar from '@/components/Common/Navbar'
import React, { Fragment } from 'react'
import Cities from './_components/Cities'
import { getCity } from '@/services/cities'
import { getCountries } from '@/services/countries'

export default async function page() {
    const response = await getCity()
    const countries = await getCountries()
  return (
    <Fragment>
        <div className='hidden md:block'>
        <Navbar />
        </div>
        <DashboardLayout name='Countries'>
            <Cities data={response} countries={countries} />
        </DashboardLayout>
    </Fragment>
  )
}