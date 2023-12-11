import { asyncFetchSingleSheetData } from "@/mapper";
import PostRepository from "../post/PostRepository";
import { log } from "console";
import SheetDataHelper from "../utils/SheetDataHelper";

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
    );
    // log("res", res);

    return res;
  },
};

export default HomeHomepageRepository;
