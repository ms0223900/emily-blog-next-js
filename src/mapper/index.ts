import { getSheetApiUrl } from "./config";

async function asyncFetchSheetData(sheetName: string) {
    return fetch(getSheetApiUrl(sheetName), {
        cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    })
        .then((res) => res.json())
        .catch((e) => {
            throw new Error(e);
        });
}

export async function asyncFetchSingleSheetData(sheetName: string): Promise<{
    values: string[][];
}> {
    const data = await asyncFetchSheetData(sheetName);
    return data;
}
