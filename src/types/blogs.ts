// types/post.ts
export type BlogPostType = {
    id:number
    title: string;
    description: string;
    image: string;
    category: string;
    email: string;
    username: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };