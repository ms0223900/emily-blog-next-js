import { NextRequest } from "next/server";
import { ShortenUrlMapper, ShortenUrlMapperGoogleSheetImpl } from "@/app/shorten-url/ShortenUrlMapper";

// export const dynamic = "force-dynamic";

class ShortenUrlResponse {
    url = "hi"

    constructor(url: string) {
        this.url = url
    }

}

class ShortenUrlRepo {
    private shortenUrlMapper: ShortenUrlMapper;

    constructor(shortenUrlMapper: ShortenUrlMapper) {
        this.shortenUrlMapper = shortenUrlMapper;
    }

    async getOriginalUrlByHash(id: string) {
        const dto = await this.shortenUrlMapper.getOriginalUrlByHash(id);
        if (!dto?.url) {
            // TODO, not found error
            throw new Error("Url not found")
        }
        return dto.url;
    }
}

class ShortenUrlService {
    private shortenUrlRepo: ShortenUrlRepo;

    constructor(shortenUrlRepo: ShortenUrlRepo) {
        this.shortenUrlRepo = shortenUrlRepo;
    }

    async execute(hash: string) {
        const originalUrlById = await this.shortenUrlRepo.getOriginalUrlByHash(hash);
        return new ShortenUrlResponse(originalUrlById);
    }
}

export async function GET(
    request: NextRequest,
    context: { params: any }
): Promise<Response> {
    console.log("url: ", request.url);
    console.log("ctx: ", context);
    console.log("ctx: ", context.params);

    try {
        const shortenUrlResponse = await new ShortenUrlService(
            new ShortenUrlRepo(new ShortenUrlMapperGoogleSheetImpl())
        ).execute(context.params.id);

        return Response.json({
            data: shortenUrlResponse
        });
    } catch (e: any) {
        return new Response(`Get shorten url error: ${e.message}`, {
            status: 400,
        });
    }

}
