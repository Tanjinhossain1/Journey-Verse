import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Reviews() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 flex flex-col items-center">
      {/* First Review */}
      <div className="flex gap-4 w-full items-center">
        <Image
          src="/Nevada.jpeg"
          alt="Avatar"
          className="rounded-full object-cover aspect-square"
          width={40}
          height={40}
          style={{ 
            width: '48px',
            height: '48px'
          }}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">modrnix</div>
              <div className="text-sm text-muted-foreground">10/06/2022</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground">
              <ThumbsUp className="w-4 h-4" />
              0
            </button>
          </div>
          <div className="flex gap-0.5">
            {Array(5).fill(null).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary text-yellow-500" />
            ))}
          </div>
          <p className="text-sm">
            If you want to get away from city life, rent a car and book Joyvam. It is a no-frills accommodation where you can enjoy fresh air and serene surrounding. A pity we only stayed 2 nights. I'll book this place again next time
          </p>
        </div>
      </div>

      {/* Second Review */}
      <div className="flex gap-4 w-full items-center">
        <Image
          src="/Nevada.jpeg"
          alt="Avatar"
          className="rounded-full object-cover aspect-square"
          width={40}
          height={40}
          style={{ 
            width: '48px',
            height: '48px'
          }}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">modrnix</div>
              <div className="text-sm text-muted-foreground">10/06/2022</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground">
              <ThumbsUp className="w-4 h-4" />
              0
            </button>
          </div>
          <div className="flex gap-0.5">
            {Array(5).fill(null).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-sm">
            Great value for money" Place was clean with everything you need provided. Best to stay if you have rented a car. Staff very friendly and helpful. Would definitely would like to come back again
          </p>
        </div>
      </div>

      {/* Third Review */}
      <div className="flex gap-4 w-full items-center">
        <Image
          src="/Nevada.jpeg"
          alt="Avatar"
          className="rounded-full object-cover aspect-square"
          width={40}
          height={40}
          style={{ 
            width: '48px',
            height: '48px'
          }}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">modrnix</div>
              <div className="text-sm text-muted-foreground">10/06/2022</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground">
              <ThumbsUp className="w-4 h-4" />
              0
            </button>
          </div>
          <div className="flex gap-0.5">
            {Array(5).fill(null).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-sm">
            Clean rooms, great staff! The room had a great ocean view, room was very clean and big, the staff super friendly and nice.
          </p>
        </div>
      </div>

      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Write a review
      </Button>
    </div>
  )
}