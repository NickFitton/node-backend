const http = require('http');
const requestHandler = require('./api/requestHandling');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer(requestHandler.handleRequest);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
