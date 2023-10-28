import axios from "axios";
import sharp from "sharp";
import { parentPort } from "worker_threads";

async function downloadImage(url) {
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  return data;
}

async function onMessage({ img, background }) {
  const [image, bg] = await Promise.all([
    downloadImage(img),
    downloadImage(background),
  ]);
  const imageBuffer = await sharp(image)
    // .grayscale()
    // .rotate(90)
    .toBuffer();
  const bgBuffer = await sharp(bg)
    .composite([{ input: imageBuffer, gravity: sharp.gravity.northeast, left: 10, top: 10 }])
    .toBuffer();
  parentPort.postMessage(bgBuffer.toString("base64"));
  parentPort.close();
}

parentPort.on("message", onMessage);
