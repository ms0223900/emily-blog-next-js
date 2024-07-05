import { asyncFetchSingleSheetData } from "@/mapper";
import { SheetListData } from "@/repos/post/SheetListData";
import { append } from "../../google-sheet-api";
// import { promises as fs } from "fs";
//
// fs.readFile("")

export interface ShortenUrlMapper {
    getOriginalUrl(id: string): Promise<ShortenUrlDto | null | undefined>;

    getOriginalUrlByHash(hash: string): Promise<ShortenUrlDto | null | undefined>;

    addUrl(url: string, urlHash: string): Promise<ShortenUrlDto | null | undefined>;
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

    async addUrl(url: string, urlHash: string): Promise<ShortenUrlDto | null | undefined> {
        // TODO
        try {
            const updatedRes = await append();
            console.log("updatedRes: ", updatedRes);
        } catch (e) {
            console.log("e: ", e);
        }
        return Promise.resolve({} as ShortenUrlDto);
    }

    private async getAll() {
        const fetched = await asyncFetchSingleSheetData("shorten-url");
        const sheetListData = SheetListData.toVOList<ShortenUrlDto>(fetched.values, this.cols);
        return sheetListData;
    }
}
