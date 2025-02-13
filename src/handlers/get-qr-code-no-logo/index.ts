import { _500, _200Image } from "../../utils/api";
import { APIGatewayEvent } from "aws-lambda";
const QRCode = require("qrcode");

// Canvas library is added to the function as a Lambda layer. Keep import but don't include libray in package.json
import { createCanvas } from "canvas";

export async function handler(
  ev: APIGatewayEvent
): Promise<{ statusCode: number; body?: string; headers: any }> {
  try {
    const id = ev.pathParameters!.id as string;
    const canvas = createCanvas(600, 600);
    await QRCode.toCanvas(canvas, `https://vaga.link/${id}`, {
      width: 600,
      margin: 2,
    });
    return _200Image(canvas.toDataURL());
  } catch (error) {
    console.log("ERROR:", error);
    return _500(error);
  }
}
