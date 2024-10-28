import { asyncFetchSingleSheetData } from "@/mapper";
import { SingleTagGroup, Tag, TagGroupFromAPI } from "./types";
import { SheetListData } from "../post/SheetListData";
import queryTagGroups, { TagEntity, TagGroupEntity } from "@/gql/tags/queryTagGroups";

const TAG_COLS: (keyof Tag)[] = ["id", "title"];
const TAG_GROUP_COLS: (keyof TagGroupFromAPI)[] = [
  "id",
  "tagGroupName",
  "tagId",
  "tagName",
];

const TagRepo = {
  getTags: async () => {
    const data = await asyncFetchSingleSheetData("tags");
    const tags = SheetListData.toVOList<Tag>(data.values, TAG_COLS).toList();

    return tags;
  },

  getTagGroups: async (): Promise<SingleTagGroup[]> => {
    const res = await queryTagGroups();
    return res.data.tagGroups.data.map(tagGroup => new SingleTagGroupVo(tagGroup));
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

class TagVo implements Tag {
  id: string;
  title: string;

  constructor(tag: TagEntity) {
    this.id = tag.id;
    this.title = tag.attributes.title;
  }
}

export default TagRepo;
