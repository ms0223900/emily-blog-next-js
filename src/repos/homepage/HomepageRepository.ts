import PostRepository from "../post/PostRepository";

interface SingleHomepagePost {
    postId: string;
    postTitle: string;
}

const HOMEPAGE_COLS = ["postId", "postTitle"] as (keyof SingleHomepagePost)[];

const HomeHomepageRepository = {
    async getData() {
        // const data = await asyncFetchSingleSheetData("homepage");
        const posts = await PostRepository.getPosts();

        // TODO, 之後再改用真正的 homepage 資料串接

        // const homepagePostsData2 = SheetListData.toVOList<
        //   SingleHomepagePost & Post
        // >(data.values, HOMEPAGE_COLS)
        //   .joinWith<Post>("postId", "id", posts)
        //   .sortBy(({ createTime }) =>
        //     createTime ? new Date(createTime).getTime() : 1
        //   )
        //   .toList();
        //
        // log("res", res);

        const homepageFinalData = {
            posts: posts,
        };

        return homepageFinalData;
    },
};

export default HomeHomepageRepository;
