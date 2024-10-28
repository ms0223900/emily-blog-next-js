import { gql } from "@apollo/client";
import client from "@/gql";
import ARTICLE_ENTITY from "@/gql/fragments/article";
import { QueriedArticleList } from "@/gql/queryArticleList";

const schema = gql`
  query GET_ARTICLE_WITH_ARTICLE_ID($articleId: StringFilterInput) {
    articles: curlyChuArticles(filters: { articleId: $articleId }) {
      data {
        ...ARTICLE_ENTITY
      }
    }
  }
  ${ARTICLE_ENTITY}
`;

const queryArticleByArticleId = (articleId: string) => {
  return client.query<{ articles: QueriedArticleList }>({
    query: schema,
    variables: {
      articleId: {
        eq: articleId,
      },
    },
  });
};

export default queryArticleByArticleId;
