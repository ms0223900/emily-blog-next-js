import { gql } from "@apollo/client";
import client from "..";
import TAG_ENTITY from "./tag";
import { QueriedTagList } from "./queryTags";
import { ID } from "common-types";

const schema = gql`
  query GET_TAG_WITH_TAG_ID($tagId: IDFilterInput) {
    tags: curlyChuArticleTags(filters: { id: $tagId }) {
      data {
        ...TAG_ENTITY
      }
    }
  }
  ${TAG_ENTITY}
`;

const queryTagById = (tagId: ID) => {
    return client.query<{ tags: QueriedTagList }>({
        query: schema,
        variables: {
            tagId: {
                eq: tagId,
            },
        },
    });
};

export default queryTagById; 