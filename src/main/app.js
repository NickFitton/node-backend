const http = require('http');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {

    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello World\n');
    res.write(req.url + '\n');
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
