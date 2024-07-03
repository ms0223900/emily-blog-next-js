import { asyncFetchSingleSheetData } from "@/mapper";
import { SheetListData } from "@/repos/post/SheetListData";

export interface ShortenUrlMapper {
    getOriginalUrl(id: string): Promise<ShortenUrlDto | null | undefined>;
}

interface ShortenUrlDto {
    id: string
    hash: string
    url: string
}

export class ShortenUrlMapperGoogleSheetImpl implements ShortenUrlMapper {
    async getOriginalUrl(id: string): Promise<ShortenUrlDto | null | undefined> {
        try {
            const fetched = await asyncFetchSingleSheetData("shorten-url");
            const sheetListData = SheetListData.toVOList<ShortenUrlDto>(fetched.values, ["id", "hash", "url"]);
            return sheetListData.toList().find(dto => dto.id === id);
        } catch (e) {
            console.log("e: ", e);
        }
        return null;
    }
}
