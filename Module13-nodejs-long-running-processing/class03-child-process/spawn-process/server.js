import { randomUUID } from "crypto";
import { createWriteStream } from "fs";
import { createServer } from "http";
import { pipeline } from "stream/promises";

const handler = async (req, res) => {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(req, createWriteStream(fileName));
  res.end(`File uploaded as ${fileName}`);
};

createServer(handler).listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
