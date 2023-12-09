import { asyncFetchSingleSheetData } from "@/mapper";

const HOMEPAGE_COLS = ["postId", "postTitle"];

const HomeHomepageRepository = {
  async getData() {
    // TODO, start from here
    const data = await asyncFetchSingleSheetData("homepage");
    console.log(data);

    return data;
  },
};

export default HomeHomepageRepository;
