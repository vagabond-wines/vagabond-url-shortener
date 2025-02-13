import { _500, _200Image } from "../../utils/api";
import { APIGatewayEvent } from "aws-lambda";
const QRCode = require("qrcode");

// Canvas library is added to the function as a Lambda layer. Keep import but don't include libray in package.json
import { createCanvas, loadImage } from "canvas";

export async function handler(
  ev: APIGatewayEvent
): Promise<{ statusCode: number; body?: string; headers: any }> {
  try {
    const id = ev.pathParameters!.id as string;
    const canvas = createCanvas(600, 600);
    const ctx = canvas.getContext("2d");
    await QRCode.toCanvas(canvas, `https://vaga.link/${id}`, {
      width: 600,
      margin: 2,
    });
    const logo = await loadImage(
      "https://vagabond-app-assets.s3.eu-west-2.amazonaws.com/red-logo.png"
    );
    ctx.drawImage(logo, 240, 240, 140, 140);
    return _200Image(canvas.toDataURL());
  } catch (error) {
    console.log("ERROR:", error);
    return _500(error);
  }
}
