import axios from "axios";
import { Writable, PassThrough } from "stream";

const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = await Promise.all([
  axios({
    method: "get",
    url: API_01,
    responseType: "stream",
  }),
  axios({
    method: "get",
    url: API_02,
    responseType: "stream",
  }),
]);

const result = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/, '');
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(name, data);
    callback();
  },
})

// result[0].pipe(output)
// result[1].pipe(output)

function merge(streams) {
  return streams.reduce((acc, curr, i, arr) => {
    // prevent the stream from closing itself
    curr.pipe(acc, { end: false })
    // make sure every stream has ended before closing the merged stream
    curr.on('end', () => arr.every(s => s.ended) && acc.end())
    return acc
  }, new PassThrough())
}

const streams = merge(result);
streams.pipe(output)
