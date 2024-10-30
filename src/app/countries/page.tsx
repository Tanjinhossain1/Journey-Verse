import DashboardLayout from '@/components/Common/DashboardLayout'
import Navbar from '@/components/Common/Navbar'
import React, { Fragment } from 'react'
import Countries from './components/Countries'
import { getCountries } from '@/services/countries'

export default async function page() {
    const response = await getCountries()
  return (
    <Fragment>
        <div className='hidden md:block'>
        <Navbar />
        </div>
        <DashboardLayout name='Countries'>
            <Countries data={response}  />
        </DashboardLayout>
    </Fragment>
  )
}
