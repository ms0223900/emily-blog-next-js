import { gql } from '@apollo/client';

const TAG_GROUP_ENTITY = gql`
  fragment TAG_GROUP_ENTITY on CurlyChuArticleTagGroupEntity {
    id
    attributes {
      title
      tags: curly_chu_article_tags {
        data {
          id
          attributes {
            title
          }
        }
      }
    }
  }
`;

export default TAG_GROUP_ENTITY;
