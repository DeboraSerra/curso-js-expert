import http from "http";
import { Readable } from "stream";

function api1(req, res) {
  let count = 0;
  const maxItems = 99
  const readable = Readable({
    read(){
      const everySecond = (id) => {
        if (count ++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `name-${count}` }) + '\n');
          return;  
        }
        clearInterval(id)
        this.push(null)
      }
      setInterval(() => everySecond(this))
    }
  })
  readable.pipe(res)
}
function api2(req, res) {
  let count = 0;
  const maxItems = 99
  const readable = Readable({
    read(){
      const everySecond = (id) => {
        if (count ++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Zézin-${count}` }) + '\n');
          return;  
        }
        clearInterval(id)
        this.push(null)
      }
      setInterval(() => everySecond(this))
    }
  })
  readable.pipe(res)
}

const server = http
  .createServer(api1)
  .listen(3000, () => console.log("server running on port 3000"));
const server2 = http
  .createServer(api2)
  .listen(4000, () => console.log("server running on port 4000"));

// curl localhost:4000 | tee log.txt 
// curl localhost:3000 | tee log.txt