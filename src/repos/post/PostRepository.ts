import { asyncFetchSingleSheetData } from "@/mapper";

const PostRepository = {
  getPosts: async () => {
    // const data = await asyncFetchSingleSheetData("posts");
    // console.log(data);

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
