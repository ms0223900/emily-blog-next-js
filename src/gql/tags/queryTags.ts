import { gql } from "@apollo/client";
import client from "..";
import TAG_ENTITY from "./tag";
import { TagEntity } from "./types";

const makeSchema = () => gql`
    query GetTags {
        tags: curlyChuArticleTags {
            data {
                ...TAG_ENTITY
            }
        }
    }
    ${TAG_ENTITY}
`;

const queryTags = () => {
    return client.query<{ tags: QueriedTagList }>({
        query: makeSchema(),
    });
}

export interface QueriedTagList {
    data: TagEntity[];
}

export default queryTags;
