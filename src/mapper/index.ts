import { getSheetApiUrl } from "./config";

async function asyncFetchSheetData(sheetName: string) {
  return fetch(getSheetApiUrl(sheetName), {
    // cache: "no-store",
  })
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
}

export async function asyncFetchSingleSheetData(sheetName: string) {
  const data = await asyncFetchSheetData(sheetName);
  return data;
}
