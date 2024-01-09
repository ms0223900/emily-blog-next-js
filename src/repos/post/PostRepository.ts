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
      .toList();
    log("post", posts);

    return posts;
  },

  getPostById: async (id: number | string) => {
    const data = await asyncFetchSingleSheetData("posts");

    const postRow = data.values.find(
      (rowVal: string[]) => rowVal[0] === String(id)
    ) as string[] | undefined;
    if (!postRow) throw new Error(`POST_${id}_NOT_FOUND!`);
    const res = SheetDataHelper.toValueObject(postRow, POST_COLS);

    if (!res.isPublished) throw new Error(`POST_NOT_AVAILABLE`);

    return res;
  },
};

export default PostRepository;
