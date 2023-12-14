import { asyncFetchSingleSheetData } from "@/mapper";
import PostRepository from "../post/PostRepository";
import { log } from "console";
import SheetDataHelper from "../utils/SheetDataHelper";
import { Post } from "../post/types";
import { SheetListData } from "../post/SheetListData";

interface SingleHomepagePost {
  postId: string;
  postTitle: string;
}

const HOMEPAGE_COLS = ["postId", "postTitle"] as (keyof SingleHomepagePost)[];

const HomeHomepageRepository = {
  async getData() {
    const data = await asyncFetchSingleSheetData("homepage");
    const posts = await PostRepository.getPosts();

    const homepagePostsData2 = SheetListData.toVOList<
      SingleHomepagePost & Post
    >(data.values, HOMEPAGE_COLS)
      .joinWith<Post>("postId", "id", posts)
      .sortBy(({ createTime }) =>
        createTime ? new Date(createTime).getTime() : 1
      )
      .toList();

    // log("res", res);

    const homepageFinalData = {
      posts: homepagePostsData2,
    };

    return homepageFinalData;
  },
};

export default HomeHomepageRepository;
