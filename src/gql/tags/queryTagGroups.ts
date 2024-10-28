import { gql } from '@apollo/client';
import TAG_GROUP_ENTITY from '../fragments/tagGroup';
import client from '..';

interface QueryTagGroupsOptions {
  paginationLimit?: number;
  sort?: string[];
}

const makeSchema = (options?: QueryTagGroupsOptions) => gql`
  query GetTagGroups {
    tagGroups: curlyChuArticleTagGroups(
      pagination: { limit: ${options?.paginationLimit || -1} }
      sort: ["createdAt:desc"]
    ) {
      data {
        ...TAG_GROUP_ENTITY
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
  ${TAG_GROUP_ENTITY}
`;

const queryTagGroups = (options?: QueryTagGroupsOptions) =>
  client.query<{ tagGroups: QueriedTagGroupList }>({
    query: makeSchema({
      ...options,
    }),
  });

export default queryTagGroups;

export interface TagEntity {
  id: string;
  attributes: {
    title: string;
  };
}

// Types
export interface TagGroupAttributes {
  title: string;
  tags: {
    data: Array<TagEntity>;
  };
}

export interface TagGroupEntity {
  id: string;
  attributes: TagGroupAttributes;
}

export interface QueriedTagGroupList {
  data: TagGroupEntity[];
  meta: {
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  };
}
