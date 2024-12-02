import { _500, _404, _200Image } from "../../utils/api";
import { APIGatewayEvent } from "aws-lambda";
var QRCode = require('qrcode')
const { createCanvas, loadImage } = require('canvas')

const ownerDomain = process.env.OWNER_DOMAIN as string;

export async function handler(
  ev: APIGatewayEvent
): Promise<{ statusCode: number; body?: string; headers: any }> {
  try {
    const id = ev.pathParameters!.id as string;

    const canvas = createCanvas(500, 500)
    const ctx = canvas.getContext('2d');

    await QRCode.toCanvas(canvas, `https://vaga.link/${id}`, {width: 500})

    const logo = await loadImage("https://vagabond-app-assets.s3.eu-west-2.amazonaws.com/red-logo.png")
    ctx.drawImage(logo, 205, 205, 90, 90);    
    return(_200Image(canvas.toDataURL()))

  } catch (error) {
    console.log((error as Error).message);
    return _500();
  }
}