import { asyncFetchSingleSheetData } from "@/mapper";
import { SheetListData } from "@/repos/post/SheetListData";

export interface ShortenUrlMapper {
    getOriginalUrl(id: string): Promise<ShortenUrlDto | null | undefined>;

    getOriginalUrlByHash(hash: string): Promise<ShortenUrlDto | null | undefined>;
}

interface ShortenUrlDto {
    id: string
    hash: string
    url: string
}

export class ShortenUrlMapperGoogleSheetImpl implements ShortenUrlMapper {
    private cols: (keyof ShortenUrlDto)[] = ["id", "hash", "url"];

    async getOriginalUrl(id: string): Promise<ShortenUrlDto | null | undefined> {
        try {
            const sheetListData = await this.getAll();
            return sheetListData.toList().find(dto => dto.id === id);
        } catch (e) {
            console.log("e: ", e);
        }
        return null;
    }

    async getOriginalUrlByHash(hash: string): Promise<ShortenUrlDto | null | undefined> {
        try {
            const sheetListData = await this.getAll();
            return sheetListData.toList().find(dto => dto.hash === hash);
        } catch (e) {
            console.log("e: ", e);
        }
        return null;
    }

    private async getAll() {
        const fetched = await asyncFetchSingleSheetData("shorten-url");
        const sheetListData = SheetListData.toVOList<ShortenUrlDto>(fetched.values, this.cols);
        return sheetListData;
    }
}
