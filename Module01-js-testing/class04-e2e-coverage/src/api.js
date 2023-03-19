const http = require('http');
const { once } = require('events');

const DEFAUL_USER = {
  username: 'DebsSerra',
  password: '123456',
}

const routes = {
  '/contact:get': (req, res) => {
    return res.end('contact us page')
  },
  '/login:post': async (req, res) => {
    const { username, password } = JSON.parse(await once(req, "data"));
    if (username !== DEFAUL_USER.username || password !== DEFAUL_USER.password) {
      res.writeHead(401);
      return res.end('Invalid username or password')
    }
    return res.end('ok')
  },
  default: (req, res) => {
    res.writeHead(404);
    res.end('Route not found');
  },
}

const handler = (req, res) => {
  const { url, method } = req;
  const path = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const route = routes[path] || routes.default;
  return route(req, res);
}

const app = http.createServer(handler).listen(3000, () => console.log(3000))

module.exports = app;
