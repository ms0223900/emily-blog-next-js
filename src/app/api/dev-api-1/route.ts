import { NextPageContext } from "next";
import { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

async function fetchApiFromOuterExample() {
    return await fetch("https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=1", {
        headers: {
            accept: "application/json"
        },
    }).then(res => res.json());
}

export async function GET(
    request: NextRequest,
    context: NextPageContext
): Promise<Response> {
    console.log("url: ", request.url);
    console.log("ctx: ", context);

    const responsePromise = await fetchApiFromOuterExample();

    return Response.json({
        data: responsePromise
    });
}
