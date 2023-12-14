export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string;
  isPublished: "TRUE" | "FALSE";
  createTime: string;
}
