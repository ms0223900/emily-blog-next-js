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
    )
      .filter((tagGroup) => !!tagGroup.tagGroupName)
      .toList();

    console.log("tagGroups: ", tagGroups);

    const resMap: Record<SingleTagGroup["title"], SingleTagGroup> = {};

    // TODO, refactor
    for (let i = 0; i < tagGroups.length; i++) {
      const tagGroup = tagGroups[i];
      if (!resMap[tagGroup.tagGroupName]) {
        resMap[tagGroup.tagGroupName] = {
          id: tagGroup.id,
          title: tagGroup.tagGroupName,
          tags: [
            {
              id: tagGroup.tagId,
              title: tagGroup.tagName,
            },
          ],
        };
      } else {
        resMap[tagGroup.tagGroupName].tags.push({
          id: tagGroup.tagId,
          title: tagGroup.tagName,
        });
      }
    }

    const res = Object.keys(resMap).map(
      (title) =>
      ({
        id: title,
        title: resMap[title].title,
        tags: resMap[title].tags,
      } as SingleTagGroup)
    );

    return res;
  },
};

export default TagRepo;
