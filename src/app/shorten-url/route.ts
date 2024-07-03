import { NextPageContext } from "next";
import { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

class ShortenUrlResponse {
    url = "hi"
}

export async function GET(
    request: NextRequest,
    context: NextPageContext
): Promise<Response> {
    console.log("url: ", request.url);
    console.log("ctx: ", context);

    // const responsePromise = await fetchApiFromOuterExample();

    return Response.json({
        data: new ShortenUrlResponse()
    });
}
