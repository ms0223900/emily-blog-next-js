import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import { SHEET_ID } from "@/mapper/config";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export async function batchUpdate() {
    const googleAuth = new GoogleAuth({
        scopes: SCOPES,
    });

    const service = google.sheets({ version: 'v4', auth: googleAuth as any, });
    const res = await service.spreadsheets.values.append({
        valueInputOption: "RAW",
        spreadsheetId: SHEET_ID,
        range: "shorten-url",
        requestBody: {
            // range: "A1",
            values: [
                ["1", "2", "3"]
            ]
        }
    });
    return res
}
