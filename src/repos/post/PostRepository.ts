import { asyncFetchSingleSheetData } from "@/mapper";
import { log } from "console";
import { Post } from "./types";
import SheetDataHelper from "../utils/SheetDataHelper";

type PostKey = keyof Post;
const POST_COLS = [
  "id",
  "title",
  "description",
  "content",
  "tags",
  "isPublished",
] as PostKey[];

const PostRepository = {
  getPosts: async () => {
    // TODO
    const data = await asyncFetchSingleSheetData("posts");
    console.log(data);
    const posts = data.values.map((rowVal: string[]) =>
      SheetDataHelper.toValueObject(rowVal, POST_COLS)
    );
    log("posts", posts);
    return posts;

    return Array(8)
      .fill(0)
      .map((_, i) => i)
      .map((id) => ({
        id: id,
        title: `Title-${id}`,
      }));
  },

  getPostById: async (id: number | string) => {
    const data = await asyncFetchSingleSheetData("posts");

    const postRow = data.values.find(
      (rowVal: string[]) => rowVal[0] === String(id)
    ) as string[] | undefined;
    if (!postRow) throw new Error(`POST_${id}_NOT_FOUND!`);

    return (() => {
      const res = {} as Post;
      for (let i = 0; i < POST_COLS.length; i++) {
        const col = POST_COLS[i];
        res[col] = postRow[i];
      }
      return res;
    })() as Post;
  },
};

export default PostRepository;
