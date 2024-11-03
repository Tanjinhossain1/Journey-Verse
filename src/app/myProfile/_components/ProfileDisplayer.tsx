"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  MapPin,
  Globe,
  Mail,
  Plane,
  Edit,
  Camera,
} from "lucide-react";
import { MyProfileType, User } from "@/types/user";
import axios from "axios";

interface ProfileFormData {
  name: string;
  location: string;
  bio: string;
  travelStyle: string;
  favoriteDestination: string;
  bucketList: string;
  email: string;
}

export default function TravelUserProfile({ user,profileDetails }: { user: User,profileDetails: MyProfileType}) {
    console.log('first name',profileDetails)
  const [isEditing, setIsEditing] = useState(false);
  const [profile] = useState<ProfileFormData>({
    name: profileDetails?.name || user?.name || "",
    location: profileDetails?.location ? profileDetails?.location :  "",
    bio: profileDetails?.bio ? profileDetails?.bio : "",
    travelStyle: profileDetails?.travelStyle ? profileDetails?.travelStyle : "",
    favoriteDestination: profileDetails?.favoriteDestination ? profileDetails?.favoriteDestination : "",
    bucketList: profileDetails?.bucketList ? profileDetails?.bucketList : "",
    email: user?.email || "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: profile,
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    const response = await axios.put("/api/myProfile", data);
    if (response?.data) { 
      window.location.reload();
    }
  };

  return (
    <Card className="w-full   mx-auto dark:text-gray-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-2xl">
            {isEditing ? "Edit Travel Profile" : "Travel Profile"}
          </CardTitle>
          <CardDescription>Manage your traveler information</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">
            {isEditing ? "Cancel edit" : "Edit profile"}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="  grid grid-cols-2 gap-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" {...register("bio")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelStyle">Travel Style</Label>
              <Select
                onValueChange={(value) =>
                  register("travelStyle").onChange({ target: { value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Backpacker">Backpacker</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Eco-friendly">Eco-friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="favoriteDestination">Favorite Destination</Label>
              <Input
                id="favoriteDestination"
                {...register("favoriteDestination")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bucketList">Travel Bucket List</Label>
              <Textarea id="bucketList" {...register("bucketList")} />
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border rounded-full">
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{profileDetails?.name ||  profile.name}</h2>
                <p className="text-muted-foreground flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">About Me</h3>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Plane className="w-4 h-4" />
                <span>Travel Style: {profile.travelStyle}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>Favorite Destination: {profile.favoriteDestination}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Camera className="w-4 h-4" />
                <span>Bucket List: {profile.bucketList}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${user.email}`} className="hover:underline">
                  {user.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <span>Joined June 2022</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isEditing && (
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="ml-auto bg-black text-white hover:bg-black"
          >
            Save Changes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
