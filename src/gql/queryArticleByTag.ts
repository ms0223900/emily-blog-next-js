import { gql } from "@apollo/client";
import { ID } from "common-types";
import client from "@/gql";
import ARTICLE_ENTITY from './fragments/article';
import { QueriedArticleList } from './queryArticleList';

const makeSchema = () => gql`
  query GET_ARTICLES_WITH_TAG_ID($tagId: IDFilterInput) {
    articles: curlyChuArticles(filters: { 
        curly_chu_article_tags: { id: $tagId },
      }, 
      pagination: { limit: -1 }, 
      sort: "id:desc") {
      data {
        ...ARTICLE_ENTITY
      }
    }
  }
  ${ARTICLE_ENTITY}
`;

const queryArticlesByTagId = (
  tagId: ID,
) => {
  return client.query<{ articles: QueriedArticleList }>({
    query: makeSchema(),
    variables: {
      tagId: {
        eq: tagId,
      },
    },
  });
};

export default queryArticlesByTagId;
