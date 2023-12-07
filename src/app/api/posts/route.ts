import { NextPageContext } from "next";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: NextPageContext
): Promise<Response> {
  console.log("url: ", request.url);
  console.log("ctx: ", context);

  return Response.json({
    data: [],
  });
}
