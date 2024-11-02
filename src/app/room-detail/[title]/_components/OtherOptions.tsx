import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { RoomsType } from "@/types/rooms";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { Bed, Home, Users, Baby } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

  
  
export default function OtherRoomOptions({ rooms }: { rooms: RoomsType[] }) {
  return (
    <div className=" mx-auto p-4 w-[60%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden border border-gray-500 shadow-xl rounded-xl">
            <CardHeader className="p-0">
              <Image
                src={room.displayImage}
                alt={room.title}
                width={400}
                height={300}
                className="w-full h-[200px] object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">{room.title}</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-muted rounded-full">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-sm">S: {room.foot_age}m²</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-muted rounded-full">
                    <Bed className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Beds: {room.bed}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-muted rounded-full">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Adults: {room.adult}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-muted rounded-full">
                    <Baby className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Child: {room.kid}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
              <div className="text-lg font-bold">
                €{room.price}.00
                <span className="text-sm font-normal text-muted-foreground">
                  /night
                </span>
              </div>
              <Link href={`/room-detail/${formatForUrlWith_under_score(room?.title)}?hotel_name=${formatForUrlWith_under_score(room?.hotel)}`}><Button variant="default" className="bg-black text-white hover:bg-black">Room Detail</Button></Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
