import { asyncFetchSingleSheetData } from "@/mapper";
import { log } from "console";

const PostRepository = {
  getPosts: async () => {
    // TODO
    const data = await asyncFetchSingleSheetData("posts");
    console.log(data);
    const posts = data.values.map((rowVal: string[]) => ({
      id: rowVal[0],
      title: rowVal[1],
    }));
    // log("posts", posts);
    return posts;

    return Array(8)
      .fill(0)
      .map((_, i) => i)
      .map((id) => ({
        id: id,
        title: `Title-${id}`,
      }));
  },
};

export default PostRepository;
