import { asyncFetchSingleSheetData } from "@/mapper";
import { SingleTagGroup, Tag, TagGroupFromAPI } from "./types";
import { SheetListData } from "../post/SheetListData";

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
    const data = await asyncFetchSingleSheetData("tagGroups");
    const tagGroups = SheetListData.toVOList<TagGroupFromAPI>(
      data.values,
      TAG_GROUP_COLS
    ).toList();

    const resMap: Record<SingleTagGroup["id"], SingleTagGroup> = {};

    for (let i = 0; i < tagGroups.length; i++) {
      const tagGroup = tagGroups[i];
      if (!resMap[tagGroup.id]) {
        resMap[tagGroup.id] = {
          id: tagGroup.id,
          title: tagGroup.tagGroupName,
          tags: [
            {
              id: tagGroup.tagId,
              title: tagGroup.tagName,
            },
          ],
        };
      }

      resMap[tagGroup.id].tags.push({
        id: tagGroup.tagId,
        title: tagGroup.tagName,
      });
    }

    const res = Object.keys(resMap).map(
      (id) =>
        ({
          id,
          title: resMap[id].title,
          tags: resMap[id].tags,
        } as SingleTagGroup)
    );

    return res;
  },
};

export default TagRepo;
