import { Star } from "lucide-react";
import Image from "next/image";
import {  ReviewsTypes } from "@/types/hotels";
import ReviewPost from "./ReviewPost";

export default function Reviews({
  id,
  reviews,
  isTour
}: {
  id: number;
  reviews: ReviewsTypes[];
  isTour?: boolean;
}) {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 flex flex-col items-center">
      {/* First Review */}
      {reviews?.map((review, index) => {
        return (
          <div key={index} className="flex gap-4 w-full items-center">
            <Image
              src="/Nevada.jpeg"
              alt="Avatar"
              className="rounded-full object-cover aspect-square"
              width={40}
              height={40}
              style={{
                width: "48px",
                height: "48px",
              }}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">{review?.name}</div>
                </div>
                {/* <button className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  0
                </button> */}
              </div>
              <div className="flex gap-0.5">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary text-yellow-500"
                    />
                  ))}
              </div>
              <p className="text-sm">{review?.content}</p>
            </div>
          </div>
        );
      })}
      <ReviewPost isTour={isTour} id={id} />
    </div>
  );
}
