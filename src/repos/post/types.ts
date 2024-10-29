import { Tag } from "common-types";

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  tagList: Tag[];
  isPublished: "TRUE" | "FALSE";
  createTime: string;
}
