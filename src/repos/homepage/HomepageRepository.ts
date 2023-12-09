import { asyncFetchSingleSheetData } from "@/mapper";

const HOMEPAGE_COLS = ["postId", "postTitle"];

const HomeHomepageRepository = {
  async getData() {
    const data = await asyncFetchSingleSheetData("homepage");
    console.log(data);
  },
};

export default HomeHomepageRepository;
