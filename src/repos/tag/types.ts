import { ID } from "common-types";

export interface Tag {
  id: ID;
  title: string;
}

export interface TagGroupFromAPI {
  id: string;
  tagGroupName: string;
  tagId: string;
  tagName: string;
}

export interface SingleTagGroup {
  id: string;
  title: string;
  tags: Tag[];
}
