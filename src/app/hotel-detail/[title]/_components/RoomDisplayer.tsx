import { Baby, BedDouble, Home, Users } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Reviews from "./Reviews";
import { HotelType } from "@/types/hotels";
import { RoomsType } from "@/types/rooms";
import Link from "next/link";
import { formatForUrlWith_under_score } from "@/utils/utils";

export default function RoomDisplay({
  hotel_detail,
  room_detail
}: {
  hotel_detail: HotelType;
  room_detail:RoomsType[]
}) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <section aria-label="Room Availability" className="space-y-4">
        <h2 className="text-2xl font-semibold">Availability</h2>
        <div className="grid gap-4">
          {room_detail.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48">
                  <Image
                    src={room.displayImage}
                    alt={room.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-4">{room.title}</h3>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          {room.foot_age}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          x{room.bed}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          x{room.adult}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Baby className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          x{room.kid}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-lg font-semibold">
                        €{(+room.price).toFixed(2)}
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          /night
                        </span>
                      </div>
                      <Link href={`/room-detail/${formatForUrlWith_under_score(room.title)}`}>
                      <Button className="bg-black hover:bg-black text-white">
                        Room Detail
                      </Button>
                      </Link>
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
                {hotel_detail?.ratings?.total}/5 Excellent
              </span>
              <span className="text-muted-foreground">
                ({hotel_detail?.reviews?.length} reviews)
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(hotel_detail?.ratings?.specific).map(([key, value]) => (
                <div key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value} / 5
                  <Progress   className="bg-slate-800 dark:bg-white" />
                </div>
              ))}
             
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground text-center mt-4">
          {hotel_detail?.reviews?.length || 0} reviews on this Hotel - Showing 1 to{" "}
          {hotel_detail?.reviews?.length || 0}
        </p>
        <hr />
        <Reviews hotel={hotel_detail}/>
      </section>
    </div>
  );
}
