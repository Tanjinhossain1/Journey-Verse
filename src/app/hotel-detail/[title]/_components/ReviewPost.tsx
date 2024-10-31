'use client'

import { FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { updateReview } from '@/services/hotels'
import { HotelType } from '@/types/hotels'

export default function ReviewPost({hotels}:{hotels:HotelType}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
 
  if (!isFormVisible) {
    return (
      <Button
        variant="default"
        className="bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => setIsFormVisible(true)}
      >
        Write a review
      </Button>
    )
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const content = (form.elements.namedItem('content') as HTMLInputElement).value;
  
    const data = { name, email, content };
    console.log('data', data);
   await updateReview(`${hotels?.id}`,data)
  };  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Leave a review</CardTitle>
        <CardDescription>
          Your email address will not be published. Required fields are marked *
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input name='name' id="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input name='email' id="email" type="email" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              name='content'
              required
              className="min-h-[150px]"
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            POST REVIEW
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}