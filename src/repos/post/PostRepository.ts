import queryArticleByArticleId from "@/gql/queryArticleByArticleId";
import queryArticleList from "@/gql/queryArticleList";
import { SingleBasicPostLinkData, SinglePost, Image, StrapiResponseAttr, ID } from "common-types";
import { SingleQueriedArticle } from "@/gql/types";

class SinglePostVo implements SinglePost {
    uid: ID;
    id: string;
    title: string;
    subTitle: string;
    description: string;
    thumbnail: Image;
    content: string;
    tagList: string[];
    relatedArticleList: SingleBasicPostLinkData[];
    createdAt: string;

    constructor(article: StrapiResponseAttr<SingleQueriedArticle>) {
        const {
            id,
            attributes: {
                content,
                article_tags,
                related_articles,
                articleId,
                title,
                subTitle,
                description,
                publishedAt,
            }
        } = article;

        this.uid = id;
        this.id = articleId;
        this.title = title;
        this.subTitle = subTitle;
        this.description = description;
        this.thumbnail = this.getImage(article);
        this.content = content;
        this.tagList = article_tags.data.map(tag => tag.attributes.title);
        this.relatedArticleList = related_articles.data.map(article => ({
            uid: article.id,
            id: article.attributes.articleId,
            title: article.attributes.title,
            subTitle: article.attributes.subTitle,
        }));
        this.createdAt = publishedAt;
    }

    getImage(article: StrapiResponseAttr<SingleQueriedArticle>): Image {
        if (article.attributes.thumbnailUrl) {
            return { src: article.attributes.thumbnailUrl };
        }
        if (article.attributes.thumbnail.data[0]) {
            return { src: article.attributes.thumbnail.data[0]?.attributes.url };
        }
        return { src: '' };
    }
}

const PostRepository = {
    getPosts: async (): Promise<SinglePost[]> => {
        const res = await queryArticleList();
        return res.data.articles.data.map(article => new SinglePostVo(article));
    },

    getPostById: async (id: number | string) => {
        const res = await queryArticleByArticleId(String(id));
        const foundPost = res.data.articles.data[0];

        if (!foundPost) throw new Error(`POST_${id}_NOT_FOUND!`);

        return foundPost;
    },

    getPostsByTag: async (tagName: string) => {
        const posts = await PostRepository.getPosts();
        console.log("tagName: ", tagName);

        return posts.filter((post) => {
            const res = (post.tagList as unknown as string[]).includes(
                decodeURI(tagName)
            );
            console.log("res: ", res);

            return res;
        });
    },

    getPostsByTagId: async (tagId: number | string) => {
        const posts = await PostRepository.getPosts();
        // TODO: 需要从数据库中获取 tagIds
        // return posts.filter((post) => post.tagIds.includes(String(tagId)));
        return posts;
    },
};

export default PostRepository;
