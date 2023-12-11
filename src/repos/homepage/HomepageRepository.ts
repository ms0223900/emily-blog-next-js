import { asyncFetchSingleSheetData } from "@/mapper";
import PostRepository from "../post/PostRepository";
import { log } from "console";
import SheetDataHelper from "../utils/SheetDataHelper";
import { Post } from "../post/types";

const HOMEPAGE_COLS = ["postId", "postTitle"];

const HomeHomepageRepository = {
  async getData() {
    const data = await asyncFetchSingleSheetData("homepage");
    const homepageData = data.values.map((d) =>
      SheetDataHelper.toValueObject(d, HOMEPAGE_COLS)
    );
    // log("homepageData", homepageData);

    const posts = await PostRepository.getPosts();
    const res = SheetDataHelper.join(
      {
        key: "postId",
        data: homepageData,
      },
      {
        key: "id",
        data: posts,
      }
    ) as Post[]; // TODO, use real type

    const homepageFinalData = {
      posts: res,
    };
    // log("res", res);

    return homepageFinalData;
  },
};

export default HomeHomepageRepository;
