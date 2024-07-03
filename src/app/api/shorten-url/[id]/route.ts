import { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

class ShortenUrlResponse {
    url = "hi"
}

class ShortenUrlService {
    execute() {
        return new ShortenUrlResponse();
    }
}

export async function GET(
    request: NextRequest,
    context: { param: any }
): Promise<Response> {
    console.log("url: ", request.url);
    console.log("ctx: ", context);
    console.log("ctx: ", context.param);

    const shortenUrlResponse = new ShortenUrlService().execute();

    return Response.json({
        data: shortenUrlResponse
    });
}
