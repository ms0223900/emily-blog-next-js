import { asyncFetchSingleSheetData } from "@/mapper";
import { Post } from "./types";
import SheetDataHelper from "../utils/SheetDataHelper";
import { SheetListData } from "./SheetListData";
import { log } from "console";

type PostKey = keyof Post;
const POST_COLS: (PostKey | "tag1" | "tag2" | "tag3")[] = [
  "id",
  "title",
  "description",
  "thumbnail",
  "content",
  "tags",
  "tag1",
  "tag2",
  "tag3",
  "isPublished",
  "createTime",
];

const PostRepository = {
  getPosts: async () => {
    const data = await asyncFetchSingleSheetData("posts");
    const posts = SheetListData.toVOList<Post>(data.values, POST_COLS as any[])
      .filter((post) => post.isPublished === "TRUE")
      .sortBy(({ createTime }) =>
        createTime ? new Date(createTime).getTime() : 1
      )
      .map((post) => ({
        ...post,
        tags: post.tags.split(", "),
      }))
      .toList();
    log("posts", posts);

    return posts;
  },

  getPostById: async (id: number | string) => {
    const data = await PostRepository.getPosts();

    const foundPost = data.find((post) => String(post.id) === String(id));
    if (!foundPost) throw new Error(`POST_${id}_NOT_FOUND!`);

    return foundPost;
  },

  getPostsByTag: async (tagName: string) => {
    const posts = await PostRepository.getPosts();
    console.log("tagName: ", tagName);

    return posts.filter((post) => {
      const res = (post.tags as unknown as string[]).includes(
        decodeURI(tagName)
      );
      console.log("res: ", res);

      return res;
    });
  },
};

export default PostRepository;
