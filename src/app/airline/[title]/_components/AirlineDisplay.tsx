import { AirlineTypes } from '@/components/Airlines'
import { Card, CardContent } from '@/components/ui/card'
import React, { Fragment } from 'react'

export default function AirlineDisplay({airline}:{airline?:AirlineTypes}) {
  return (
    <Fragment>
         <section className="relative h-96 bg-cover bg-center" style={{backgroundImage: "url('/journey-bg.jpeg?height=400&width=800')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold">{airline?.name}</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-3xl font-semibold mb-4">About {airline?.name}</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: airline?.about ? airline?.about  : "" }} />
            </CardContent>
          </Card>
        </div>
      </section>
    </Fragment>
  )
}
