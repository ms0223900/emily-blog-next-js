export interface Tag {
  id: string;
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
