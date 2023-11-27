const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
     });

    req.on('end', () => {
      try {
        const requestBody = chunks.join('');
        const obj = JSON.parse(chunks)
        const value1 = obj.num1;
        const value2 = obj.num2;

      // Write code here to calculate power of a number
        if (!Number.isInteger(value1) || value1 <= 0) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('The operation cannot be performed');
          return;
        }

        if (!Number.isInteger(value2) || value2 < 0) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid input. num2 must be a non-negative integer.');
          return;
        }

        // Calculate the exponentiation
        const result = Math.pow(value1, value2);

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`The result is ${result}`);
        } 
        catch (error) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid input. Please provide valid JSON with num1 and num2.');
        }
      });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Endpoint not found.');
      }
});

module.exports = server;
      
