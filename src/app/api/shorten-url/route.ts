import { NextRequest } from "next/server";
import { ShortenUrlRepo } from "@/app/shorten-url/ShortenUrlRepo";
import { ShortenUrlMapperGoogleSheetImpl } from "@/app/shorten-url/ShortenUrlMapper";

class GenerateShortenUrlService {
    private shortenUrlRepo: ShortenUrlRepo;

    constructor(shortenUrlRepo: ShortenUrlRepo) {
        this.shortenUrlRepo = shortenUrlRepo

    }

    async execute(url: string) {
        await this.shortenUrlRepo.addUrl(url)
    }
}

export async function POST(
    request: NextRequest,
    context: { params: any }
): Promise<Response> {
    const reqBody = await request.json();
    if (!reqBody.url) {
        return new Response(`Add shorten url error: ${"url required "} :(`, {
            status: 400,
        });
    }
    // console.log("reqBody: ", reqBody);

    try {
        const shortenUrlResponse = await new GenerateShortenUrlService(
            new ShortenUrlRepo(new ShortenUrlMapperGoogleSheetImpl())
        ).execute(reqBody.url);

        return Response.json({
            // data: shortenUrlResponse
        });
    } catch (e: any) {
        return new Response(`Add shorten url error: ${e.message}`, {
            status: 401,
        });
    }
}
