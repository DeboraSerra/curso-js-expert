import Http from 'http';

// Interceptor, decorator e middleware são as mesmas coisas

async function InjectHttpInterceptor(req, res, next) {
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function(...args) {
    const [type, req, res] = args;
    if (type === 'request') {
      res.setHeader('X-Instrumented-By', 'DebsSerra');
    }
    return oldEmit.apply(this, args);
  }
}

export { InjectHttpInterceptor }