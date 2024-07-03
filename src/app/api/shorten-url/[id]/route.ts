import { NextRequest } from "next/server";
import { ShortenUrlMapper, ShortenUrlMapperImpl } from "@/app/shorten-url/ShortenUrlMapper";

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

    getOriginalUrlById(id: string) {
        this.shortenUrlMapper.getOriginalUrl(id)
        return id + "aaa";
    }
}

class ShortenUrlService {
    private shortenUrlRepo: ShortenUrlRepo;

    constructor(shortenUrlRepo: ShortenUrlRepo) {
        this.shortenUrlRepo = shortenUrlRepo;
    }

    execute(id: string) {
        const originalUrlById = this.shortenUrlRepo.getOriginalUrlById(id);
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

    const shortenUrlResponse = new ShortenUrlService(new ShortenUrlRepo(new ShortenUrlMapperImpl())).execute(context.params.id);

    return Response.json({
        data: shortenUrlResponse
    });
}
