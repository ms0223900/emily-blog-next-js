import { SingleTagGroup, Tag } from "./types";
import queryTagGroups, { TagGroupEntity } from "@/gql/tags/queryTagGroups";
import { TagEntity } from '@/gql/tags/types';
import queryTags from "@/gql/tags/queryTags";
import { ID } from "common-types";
import queryTagById from "@/gql/tags/queryTagById";
import { TagRepositoryException } from "./TagRepositoryException";

const TagRepo = {
  getTags: async (): Promise<Tag[]> => {
    const res = await queryTags();
    return res.data.tags.data.map(tag => new TagVo(tag));
  },

  getTagGroups: async (): Promise<SingleTagGroup[]> => {
    const res = await queryTagGroups();
    return res.data.tagGroups.data.map(tagGroup => new SingleTagGroupVo(tagGroup));
  },

  getTagById: async (tagId: ID): Promise<Tag> => {
    const res = await queryTagById(tagId);
    const tagData = res.data.tags.data[0];
    if (!tagData) {
      throw new TagRepositoryException(`Tag with ID ${tagId} not found`);
    }
    return new TagVo(tagData);
  },
};

class SingleTagGroupVo implements SingleTagGroup {
  id: string;
  title: string;
  tags: Tag[];

  constructor(tagGroup: TagGroupEntity) {
    this.id = tagGroup.id;
    this.title = tagGroup.attributes.title;
    this.tags = tagGroup.attributes.tags.data.map(tag => new TagVo(tag));
  }
}

export class TagVo implements Tag {
  id: ID;
  title: string;

  constructor(tag: TagEntity) {
    this.id = tag.id;
    this.title = tag.attributes.title;
  }
}

export default TagRepo;
