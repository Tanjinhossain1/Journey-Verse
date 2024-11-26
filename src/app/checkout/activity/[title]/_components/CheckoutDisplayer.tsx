"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MapPin } from "lucide-react";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  formatDateToDDMMYYYY,
  formatForUrlWith_under_score,
} from "@/utils/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "axios";
import { ActivityTypes } from "@/types/activity";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckoutForm } from "@/app/checkout/[title]/_components/CheckoutDisplayer";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import SVGLoader from "@/components/Common/Loader";

const bookingSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
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

// Make sure to replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout({
  activity_detail,
  user,
}: {
  activity_detail: ActivityTypes;
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

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof bookingSchema
  > | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
    setShowPaymentDialog(true);
    setSubmittedData(data);
  };
  const handlePaymentSuccess = async (cardNumber: string) => {
    setPaymentSuccess(true);
    // Here you would typically send the booking data to your server
    console.log("submittedData  ", submittedData);
    const payload = {
      ...submittedData,
      totalAmount: finalAmount, // Add totalAmount to the payload
      checkIn,
      adults,
      children,
      cardNumber,
      activity_name: activity_detail?.title,
      status: "pending",
    };
    console.log(payload);
    const response = await axios.post(`/api/activity_order`, payload);
    if (response?.data) {
      setTimeout(() => {
        router.push("/dashboard/activity/orders");
      }, 2000);
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
                className="w-full bg-black hover:bg-black text-white dark:bg-gray-200 dark:text-black rounded-xl"
              >
                Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
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
                  src={activity_detail?.displayImage}
                  alt="Hotel"
                  width={20}
                  height={20}
                  layout="responsive"
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{activity_detail?.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {activity_detail?.city}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Your Activity</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Date</span>
                  <div className="text-right">
                    <div>{formatDateToDDMMYYYY(checkIn)}</div>
                    <Link
                      href={`/activity_detail/${formatForUrlWith_under_score(
                        activity_detail.title
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
                  <span>Cancelation</span>
                  <span>{activity_detail.tourType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{activity_detail.totalDuration}</span>
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
                    ${(+activity_detail.price * +adults * 1.06).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Children Price</span>
                  <span>${(+activity_detail.price / 2) * +children}</span>
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
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Please enter your card details to complete the booking.
            </DialogDescription>
          </DialogHeader>
          {!paymentSuccess ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalAmount={+(+totalAmount * 1) / 100 + +totalAmount}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          ) : (
            <div className="text-center text-green-600">
              <p>Payment successful! Redirecting to your orders...</p>

              <div className="flex justify-center"><SVGLoader /></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
