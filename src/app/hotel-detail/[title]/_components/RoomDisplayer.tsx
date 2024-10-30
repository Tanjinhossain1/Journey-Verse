import { BedDouble, Home, Users, Wifi } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Reviews from "./Reviews"

// Sample data structure
const rooms = [
  {
    id: 1,
    name: "Junior Suite",
    image: "/Nevada.jpeg",
    size: "260m²",
    capacity: {
      beds: 3,
      people: 4,
      wifi: 3,
    },
    price: 350.00,
  },
  {
    id: 2,
    name: "Executive Room With Lake View",
    image: "/Nevada.jpeg",
    size: "230m²",
    capacity: {
      beds: 3,
      people: 4,
      wifi: 4,
    },
    price: 195.00,
  },
  {
    id: 3,
    name: "Lake Tahoe House",
    image: "/Nevada.jpeg",
    size: "200m²",
    capacity: {
      beds: 3,
      people: 5,
      wifi: 2,
    },
    price: 300.00,
  },
]

const reviews = {
  average: 5,
  total: 3,
  categories: [
    { name: "Cleanliness", score: 2 },
    { name: "Communication", score: 5 },
    { name: "Check-in", score: 5 },
    { name: "Accuracy", score: 5 },
    { name: "Location", score: 5 },
    { name: "Value", score: 5 },
  ],
}

export default function RoomDisplay() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <section aria-label="Room Availability" className="space-y-4">
        <h2 className="text-2xl font-semibold">Availability</h2>
        <div className="grid gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-4">{room.name}</h3>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          {room.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          x{room.capacity.beds}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          x{room.capacity.people}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          x{room.capacity.wifi}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-lg font-semibold">
                        €{room.price.toFixed(2)}
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          /night
                        </span>
                      </div>
                      <Button className="bg-black hover:bg-black text-white">Room Detail</Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="Reviews" className="space-y-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-yellow-400 text-xl">★</div>
              <span className="font-semibold">
                {reviews.average}/{reviews.average} Excellent
              </span>
              <span className="text-muted-foreground">
                ({reviews.total} reviews)
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{category.name}</span>
                    <span>{category.score}/5</span>
                  </div>
                  <Progress className="bg-black dark:bg-white"   />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground text-center mt-4">
          {reviews.total} reviews on this Hotel - Showing 1 to {reviews.total}
        </p>
        <hr />
        <Reviews />
      </section>
    </div>
  )
}