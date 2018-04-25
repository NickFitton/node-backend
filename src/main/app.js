import http from 'http';
import { handleRequest } from './api/requestHandling';

const hostname = 'localhost';
const port = 8080;

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
