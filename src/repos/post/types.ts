export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  tags: string;
  isPublished: "TRUE" | "FALSE";
  createTime: string;
}
