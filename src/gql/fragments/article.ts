import { gql } from '@apollo/client';

const ARTICLE_ENTITY = gql`
  fragment ARTICLE_ENTITY on CurlyChuArticleEntity {
    id
    attributes {
      articleId
      title
      subTitle
      description
      publishedAt
      content
      thumbnailUrl
      article_tags: curly_chu_article_tags {
        data {
          id
          attributes {
            title
          }
        }
      }
      thumbnail {
        data {
          attributes {
            url
          }
        }
      }
      related_articles: related_curly_chu_articles {
        data {
          id
          attributes {
            articleId
            title
            subTitle
          }
        }
      }
    }
  }
`;

export default ARTICLE_ENTITY;
