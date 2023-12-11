export const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
export const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
export const getSheetApiUrl = (sheetName: string) =>
  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}!A2:K500?key=${API_KEY}`;
