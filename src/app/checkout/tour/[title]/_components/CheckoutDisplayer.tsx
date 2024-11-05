"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CreditCard, MapPin } from "lucide-react";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  formatDateToDDMMYYYY,
  formatForUrlWith_under_score,
} from "@/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "axios";
import { TourTypes } from "@/types/tours";

const bookingSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
  cardNumber: z.string().min(1, "cardN umber is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  acceptTerms: z.string().min(1, "accept Terms is required"),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  stateProvince: z.string(),
  zipCode: z.string(),
  country: z.string(),
  specialRequirements: z.string().optional(),
  couponCode: z.string().optional(),
});

export default function Checkout({
  tour_detail,
  user,
}: {
  tour_detail: TourTypes;
  user: User;
}) {
  const router = useRouter();
  console.log(user);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn") ?? "";
  const children = searchParams.get("children") ?? 0;
  const adults = searchParams.get("adults") ?? 1;
  const totalAmount = searchParams.get("total_amount") ?? 1;
  const finalAmount = (+totalAmount * 1) / 100 + +totalAmount;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      email: user?.email ? user.email : "",
      fullName: user?.name ? user.name : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    const payload = {
      ...data,
      totalAmount: finalAmount, // Add totalAmount to the payload
      checkIn,
      adults,
      children,
      tour_name: tour_detail?.title,
      status:"pending",
    };
    console.log(payload);
    const response = await axios.post(`/api/tour_order`, payload);
    if (response?.data) {
      router.push("/dashboard/tours/orders");
    }
  };
  return (
    <div className="container mx-auto p-6 dark:text-gray-300">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="mb-6 text-2xl font-semibold dark:text-gray-300">
            Booking Submission
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Full Name"
                  {...register("fullName")}
                  disabled
                  className={
                    errors.fullName ? "border-red-500" : "text-gray-500"
                  }
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  disabled
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : "text-gray-500"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Your Phone"
                  {...register("phone")}
                  className={errors.phone ? "border-red-500" : "text-gray-500"}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  className="text-gray-500"
                  id="addressLine1"
                  placeholder="Your Address Line 1"
                  {...register("addressLine1")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  className="text-gray-500"
                  id="addressLine2"
                  placeholder="Your Address Line 2"
                  {...register("addressLine2")}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  className="text-gray-500"
                  id="city"
                  placeholder="Your City"
                  {...register("city")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stateProvince">State/Province/Region</Label>
                <Input
                  className="text-gray-500"
                  id="stateProvince"
                  placeholder="State/Province/Region"
                  {...register("stateProvince")}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP code/Postal code</Label>
                <Input
                  className="text-gray-500"
                  id="zipCode"
                  placeholder="ZIP code/Postal code"
                  {...register("zipCode")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  className="text-gray-500"
                  id="country"
                  placeholder="Country"
                  {...register("country")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Special Requirements"
                {...register("specialRequirements")}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4 rounded-lg   p-4">
              <h3 className="text-xl font-semibold">Select Payment Method</h3>

              <Select defaultValue="stripe">
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <CreditCard />
                      Stripe
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">
                    <div className="flex items-center gap-2">
                      <CreditCard />
                      Stripe
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Input
                  placeholder="Card number"
                  {...register("cardNumber")}
                  className={errors.cardNumber ? "border-red-500" : ""}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-red-500">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" {...register("acceptTerms")} />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and accept the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-500">
                  {errors.acceptTerms.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-black hover:bg-black text-white dark:bg-gray-200 dark:text-black"
              >
                Submit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-6 text-2xl font-semibold">Your Booking</h2>

          <div className="mb-6 rounded-lg border p-4">
            <div className="flex gap-4  ">
              <div className="flex gap-4 h-20 w-20 ">
                <Image
                  src={tour_detail?.displayImage}
                  alt="Hotel"
                  width={20}
                  height={20}
                  layout="responsive"
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{tour_detail?.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {tour_detail?.city}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Your Tour</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Date</span>
                  <div className="text-right">
                    <div>{formatDateToDDMMYYYY(checkIn)}</div>
                    <Link
                      href={`/tour-detail/${formatForUrlWith_under_score(
                        tour_detail.title
                      )}`}
                    >
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm text-blue-600"
                      >
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span>Tour Type</span>
                  <span>{tour_detail.tourType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{tour_detail.totalDuration}</span>
                </div>

                <div className="flex justify-between">
                  <span>Adults</span>
                  <span>{adults}</span>
                </div>
                <div className="flex justify-between">
                  <span>Children</span>
                  <span>{children}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300">
              <h3 className="mb-2 font-semibold pt-4">Price details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Adult Price</span>
                  <span>
                    ${(+tour_detail.price * +adults * 1.06).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Children Price</span>
                  <span>${(+tour_detail.price / 2) * +children}</span>
                </div>
                <div className="flex justify-between   pt-2">
                  <span>Tax</span>
                  <span>${((+totalAmount * 1) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg font-semibold">
                  <span>Pay Amount</span>
                  <span>${finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
