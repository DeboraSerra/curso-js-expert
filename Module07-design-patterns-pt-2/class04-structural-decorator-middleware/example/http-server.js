import http from 'http';
import { InjectHttpInterceptor } from '../index.js'
InjectHttpInterceptor();

function handler(req, res) {
  // res.setHeader('X-Instrumented-By', 'DebsSerra');
  res.end('Hello World!');
}

const server = http.createServer(handler);
server.listen(3000, () => console.log('Server running at http://localhost:3000'));