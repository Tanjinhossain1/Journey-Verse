"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload, Edit, Delete } from "lucide-react";
import { CityType } from "@/types/city";
import { ActivityTypes } from "@/types/activity";
import { getActivity } from "@/services/activity";

type Activity = ActivityTypes;

export default function ActivityManagement({ cityData }: { cityData: CityType[] }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { register, control, handleSubmit, reset, setValue } = useForm<Activity>({
    defaultValues: {
      specificReviews: {
        accuracy: "5",
        checkIn: "5",
        cleanliness: "5",
        communication: "5",
        location: "5",
        value: "5",
      },
    },
  });
  const [activity, setActivity] = useState<ActivityTypes[]>([]);
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({ control, name: "languages" });
  const {
    fields: aboutFields,
    append: appendAbout,
    remove: removeAbout,
  } = useFieldArray({ control, name: "about" });
  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "highlight" });
  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({ control, name: "included" });
  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({ control, name: "excluded" });
  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({ control, name: "itinerary" });
  const {
    fields: durationFields,
    append: appendDuration,
    remove: removeDuration,
  } = useFieldArray({ control, name: "durations" });
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({ control, name: "questions" });
  //   const {
  //     fields: discountFields,
  //     append: appendDiscount,
  //     remove: removeDiscount,
  //   } = useFieldArray({ control, name: "discounts" });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "computer-services");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/djvcnudls/image/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "displayImage" | "images"
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      if (fieldName === "displayImage") {
        const url = await uploadToCloudinary(files[0]);
        setValue("displayImage", url);
      } else {
        const urls = await Promise.all(
          Array.from(files).map(uploadToCloudinary)
        );
        setValue("images", urls);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data: Activity) => {
    setIsSubmitting(true);
    try {
      let response;
      if (isEditing) {
        const payload = {
          ...data,
          id: data?.id,
        };
        console.log(payload);
        response = await axios.put(`/api/activity`, payload);
        console.log("Activity updated:", response.data);
      } else {
        response = await axios.post("/api/activity", data);
        console.log("Activity created:", response.data);
      }
      reset();
      setShowForm(false);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting Activity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchActivity = async () => {
    try {
      const response = await getActivity();
      setActivity(response as ActivityTypes[]);
    } catch (error) {
      console.error("Error fetching Activity:", error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const handleEdit = (activity: ActivityTypes) => {
    setIsEditing(true);
    setShowForm(true);
    reset(activity);
  };

  const deleteActivity = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Activity?"
    );

    if (confirmDelete) {
      await axios
        .delete(`/api/activity?id=${id}`)
        .then((response) => {
          if (response?.data) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting Activity:", error);
        });
    }
  };
  return (
    <div className="container mx-auto p-4">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Activity List</h1>
            <Button
              className="bg-black dark:bg-gray-300 hover:bg-black text-white "
              onClick={() => {
                setShowForm(true);
                setIsEditing(false);
                reset({});
              }}
            >
              Create Activity
            </Button>
          </div>
          <div className="overflow-x-auto h-[650px]">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">City</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Update</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((activity, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{activity.city}</td>
                    <td className="py-2 px-4 border-b">{activity.title}</td>
                    <td className="py-2 px-4 border-b">{activity.price}</td>
                    <td className="py-2 px-4 border-b">
                      <Button onClick={() => handleEdit(activity)} size="sm">
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        onClick={() => deleteActivity(activity?.id)}
                        className="text-red-600"
                      >
                        <Delete className="text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="max-h-[calc(90vh-2rem)] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Activity" : "Create New Activity"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city', { required: true })} />
              </div> */}
              <div className="flex gap-3">
                <select
                  {...register("city", { required: true })}
                  className="border p-2 w-full"
                >
                  {cityData.map((country) => (
                    <option key={country?.id} value={country?.city}>
                      {country?.city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title", { required: true })} />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" {...register("price")} />
              </div>
              <div>
                <Label htmlFor="totalRating">Total Rating</Label>
                <Input id="totalRating" {...register("totalRating")} />
              </div>
              <div>
                <Label htmlFor="totalDuration">Total Duration</Label>
                <Input id="totalDuration" {...register("totalDuration")} />
              </div>
              <div>
                <Label htmlFor="tourType">Cancelation</Label>
                <Input id="tourType" {...register("tourType")} />
              </div>
              <div>
                <Label htmlFor="groupSize">Group Size</Label>
                <Input id="groupSize" {...register("groupSize")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="displayImage">Display Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="displayImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "displayImage")}
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={() =>
                      document.getElementById("displayImage")?.click()
                    }
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="images">Additional Images</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "images")}
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => document.getElementById("images")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Languages</Label>
                {languageFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Input
                      {...register(`languages.${index}.lang`)}
                      placeholder="Language"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeLanguage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendLanguage({ lang: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Language
                </Button>
              </div>
              <div>
                <Label>About</Label>
                {aboutFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Textarea
                      {...register(`about.${index}.detail`)}
                      placeholder="About detail"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeAbout(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendAbout({ detail: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add About
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Highlights</Label>
                {highlightFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Input
                      {...register(`highlight.${index}.list`)}
                      placeholder="Highlight"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendHighlight({ list: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Highlight
                </Button>
              </div>
              <div>
                <Label>Included</Label>
                {includedFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Input
                      {...register(`included.${index}.list`)}
                      placeholder="Included item"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeIncluded(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendIncluded({ list: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Included Item
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Excluded</Label>
                {excludedFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Input
                      {...register(`excluded.${index}.list`)}
                      placeholder="Excluded item"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeExcluded(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendExcluded({ list: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Excluded Item
                </Button>
              </div>
              <div>
                <Label>Itinerary</Label>
                {itineraryFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 mt-2">
                    <Input
                      {...register(`itinerary.${index}.title`)}
                      placeholder="Itinerary title"
                    />
                    <div className="flex items-center space-x-2">
                      <Textarea
                        {...register(`itinerary.${index}.description`)}
                        placeholder="Itinerary description"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItinerary(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendItinerary({ title: "", description: "" })
                  }
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Itinerary Item
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Durations</Label>
                {durationFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Input
                      {...register(`durations.${index}.duration`)}
                      placeholder="Duration"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeDuration(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendDuration({ duration: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Duration
                </Button>
              </div>
              <div>
                <Label>Questions</Label>
                {questionFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 mt-2">
                    <Input
                      {...register(`questions.${index}.title`)}
                      placeholder="Question title"
                    />
                    <div className="flex items-center space-x-2">
                      <Textarea
                        {...register(`questions.${index}.description`)}
                        placeholder="Question description"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeQuestion(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendQuestion({ title: "", description: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Question
                </Button>
              </div>
            </div>

            {/* <div>
              <Label>Discounts</Label>
              {discountFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2"
                >
                  <Input
                    {...register(`discounts.${index}.group`)}
                    placeholder="Group"
                  />
                  <Input
                    {...register(`discounts.${index}.fromAdult`)}
                    placeholder="From Adult"
                  />
                  <Input
                    {...register(`discounts.${index}.toAdult`)}
                    placeholder="To Adult"
                  />
                  <Input
                    {...register(`discounts.${index}.value`)}
                    placeholder="Discount Value"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeDiscount(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendDiscount({
                    group: "",
                    fromAdult: "",
                    toAdult: "",
                    value: "",
                  })
                }
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Discount
              </Button>
            </div> */}

            <div className="mb-6">
              <Label className="text-lg font-semibold mb-4">
                Specific Reviews
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cleanliness">Cleanliness</Label>
                  <Input
                    id="cleanliness"
                    {...register("specificReviews.cleanliness")}
                  />
                </div>
                <div>
                  <Label htmlFor="accuracy">Accuracy</Label>
                  <Input
                    id="accuracy"
                    {...register("specificReviews.accuracy")}
                  />
                </div>
                <div>
                  <Label htmlFor="communication">Communication</Label>
                  <Input
                    id="communication"
                    {...register("specificReviews.communication")}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...register("specificReviews.location")}
                  />
                </div>
                <div>
                  <Label htmlFor="checkIn">Check-in</Label>
                  <Input
                    id="checkIn"
                    {...register("specificReviews.checkIn")}
                  />
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" {...register("specificReviews.value")} />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-black dark:bg-gray-200 dark:text-black dark:hover:bg-gray-200"
              >
                {isSubmitting
                  ? "Submitting..."
                  : isEditing
                  ? "Update"
                  : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
