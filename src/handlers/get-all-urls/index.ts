import { _500, _404, _200 } from "../../utils/api";
import { APIGatewayEvent } from "aws-lambda";
import { ShortURL } from "../../types/shorturl";
import { getAllUrls } from "../../utils/dynamodb";

export async function handler(
  ev: APIGatewayEvent
): Promise<{ statusCode: number; body?: string; headers: any }> {
  try {
    const su = (await getAllUrls()) as [ShortURL] | null;
    if (!su) {
      return _404("No Urls found", "0");
    }
    return _200(su);
  } catch (error) {
    console.log((error as Error).message);
    return _500();
  }
}
