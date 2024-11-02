"use client";

import { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, ListIcon, Upload, Delete, Edit } from "lucide-react";
import { MdEditor } from "md-editor-rt";
import { BlogPostType } from "@/types/blogs";
import axios from "axios";

import "md-editor-rt/lib/style.css";
import { User } from "@/types/user";

export default function BlogPostForm({
  blogs,
  user,
}: {
  blogs: BlogPostType[];
  user: User;
}) {
  const [text, setText] = useState("");
  const [posts] = useState<BlogPostType[]>(blogs);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [editPost, setEditPost] = useState<boolean>(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  console.log("user ", user);
  const { control, handleSubmit, reset, setValue } = useForm<BlogPostType>({
    defaultValues: {
      email: user?.email,
      username: user?.name,
    },
  });

  const onSubmit = async (data: BlogPostType) => {
    const payload = editPost
      ? {
          ...data,
          content: text,
          email: user?.email,
          id: editPostId,
        }
      : {
          ...data,
          content: text,
          email: user?.email,
        };
    console.log("payload ", payload);
    const response = editPost
      ? await axios.put("/api/blogs", payload)
      : await axios.post("/api/blogs", payload);
    if (response?.data) {
      reset();
      setShowForm(false);
      window.location.reload();
    }
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "computer-services");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/djvcnudls/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setValue("image", data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteBlogPost = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Blog?"
    );

    if (confirmDelete) {
      await axios
        .delete(`/api/blogs?id=${id}`)
        .then((response) => {
          if (response?.data) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting BlogPost:", error);
        });
    }
  };
  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex justify-between items-center mb-4"> 
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <ListIcon className="mr-2 h-4 w-4" />
              Show Posts
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </>
          )}
        </Button>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-4 ${showContent ? "" : "max-w-md"}  mx-auto`}
        >
          {showContent ? (
            <Fragment>
              <MdEditor language="en-US" modelValue={text} onChange={setText} />
            </Fragment>
          ) : (
            <Fragment>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: "Title is required" }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Input {...field} placeholder="Title" />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Textarea {...field} placeholder="Description" />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="image"
                control={control}
                defaultValue=""
                rules={{ required: "Image is required" }}
                render={({ field: { value }, fieldState: { error } }) => (
                  <div>
                    <div className="flex items-center space-x-2 bg-black text-white w-[170px]">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden bg-black"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </label>
                      {uploading && (
                        <span className="text-sm text-muted-foreground">
                          Uploading...
                        </span>
                      )}
                      {value && (
                        <span className="text-sm text-muted-foreground">
                          Image uploaded
                        </span>
                      )}
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <div className="bg-white">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white cursor-pointer">
                        <SelectItem className="cursor-pointer" value="Travel">
                          Travel
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Booking">
                          Booking
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Hotel">
                          Hotel
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Stays">
                          Stays
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                disabled
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Input {...field} type="email" placeholder="Email" />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Input {...field} placeholder="Username" />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </Fragment>
          )}

          <Button
            type="button"
            onClick={() => setShowContent(!showContent)}
            className="w-full bg-purple-800 text-white hover:bg-black "
          >
            {showContent ? "Hide Content" : "Add Content"}
          </Button>
          {showContent ? null : (
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black "
            >
              Create Post
            </Button>
          )}
        </form>
      ) : (
        <div >
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {posts.map((post, index) => (
                <TableRow key={index} >
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.username}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteBlogPost(post?.id)}
                      className="text-red-600"
                    >
                      <Delete className="text-red-600" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditPost(true);
                        setEditPostId(post.id);
                        setText(post.content)
                        reset({
                          email: user?.email,
                          username: post?.username
                            ? post?.username
                            : user?.name,
                          title: post?.title ? post?.title : "",
                          category: post?.category ? post?.category : "",
                          content: post?.content ? post?.content : "",
                          description: post?.description
                            ? post?.description
                            : "",
                          image: post?.image ? post?.image : "",
                        });
                      }}
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
