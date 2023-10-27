import { createServer } from 'http';
import Events from 'events'

const myEvent = new Events()

function onData() {
  const items = []
  setInterval(() => items.push(Date.now()))
}

myEvent.on('data', onData);

createServer((req, res) => {
  myEvent.emit('data', Date.now());
  res.end('ok');
}).listen(3000, () => console.log('Server running on port 3000'));
