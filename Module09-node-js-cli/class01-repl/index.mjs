import http from 'http';

function netSalary({ discount, salary }) {
  const percentage = discount / 100;
  const cost = salary * percentage;
  return salary - cost;
}

http.createServer((req, res) => {
  const { url } = req;
  const [, queryString] = url.split('?');
  const params = new URLSearchParams(queryString);
  const discount = Number(params.get('discount'));
  const salary = Number(params.get('salary'));
  const salaryNet = netSalary({ discount, salary });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Salary: R$ ${salary.toFixed(2).replace('.', ',')}</h1>`);
  res.write(`<h1>Discount: ${discount} %</h1>`);
  res.write(`<h1>Salary Net: R$ ${salaryNet.toFixed(2).replace('.', ',')}</h1>`);
  res.end();
  // res.end('Hello World!');
})
.listen(3000, () => console.log('Server running at http://localhost:3000/'));