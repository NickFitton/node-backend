const url = require('url');
const fs = require('fs');

function handleRequest(request, response) {
  const path = url.parse(request.url).pathname;

  switch (path.split('/')[1]) {
    case 'login':
      response.setHeader('Content-Type', 'text/plain');
      response.write('Login Here\n');
      response.statusCode = 200;
      response.end();
      break;
    case 'home':
      response.setHeader('Content-Type', 'text/plain');
      response.write('Home Page\n');
      response.statusCode = 200;
      response.end();
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      loadFile('./src/main/page/not_found.html', response);
      response.statusCode = 404;
  }
}

function loadFile(path, response) {
  fs.readFile(path, null, function(error, data) {
    if (error) {
      console.log(error);
      response.writeHead(404);
      response.write('File not found!');
    } else {
      response.write(data);
    }
    response.end();
  });
}

module.exports = {
  handleRequest
};
