import { asyncFetchSingleSheetData } from "@/mapper";
import { log } from "console";
import { Post } from "./types";
import SheetDataHelper from "../utils/SheetDataHelper";

type PostKey = keyof Post;
const POST_COLS: PostKey[] = [
  "id",
  "title",
  "description",
  "content",
  "tags",
  "isPublished",
  "createTime",
];

const PostRepository = {
  getPosts: async () => {
    const data = await asyncFetchSingleSheetData("posts");
    // console.log(data);
    const posts = data.values.map((rowVal: string[]) =>
      SheetDataHelper.toValueObject(rowVal, POST_COLS)
    );
    // log("posts", posts);
    return posts;
  },

  getPostById: async (id: number | string) => {
    const data = await asyncFetchSingleSheetData("posts");

    const postRow = data.values.find(
      (rowVal: string[]) => rowVal[0] === String(id)
    ) as string[] | undefined;
    if (!postRow) throw new Error(`POST_${id}_NOT_FOUND!`);

    return SheetDataHelper.toValueObject(postRow, POST_COLS);
  },
};

export default PostRepository;
