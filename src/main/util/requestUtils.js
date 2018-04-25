const fs = require('fs');

function promiseRequestBody(request) {
  return new Promise(resolve => {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      resolve(body);
    });
  });
}

function loadFile(path, response) {
  fs.readFile(path, null, (error, data) => {
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

function returnPageNotFound(response) {
  response.setHeader('Content-Type', 'text/html');
  loadFile('./src/main/page/not_found.html', response);
  response.statusCode = 404;
}

function returnNotFound(response, reason) {
  response.statusCode = 404;
  response.write(reason);
  response.end();
}

function returnNotImplemented(response) {
  response.statusCode = 501;
  response.end();
}

function returnBadRequest(response, reason) {
  response.statusCode = 400;
  response.write(reason);
  response.end();
}

function returnInternalServerError(response, reason) {
  response.statusCode = 500;
  response.write(reason);
  response.end();
}

function returnJson(response, json, statusCode) {
  response.statusCode = statusCode;
  response.write(JSON.stringify(json));
  response.end();
}

module.exports = {
  promiseRequestBody,
  loadFile,
  returnNotFound,
  returnPageNotFound,
  returnNotImplemented,
  returnJson,
  returnBadRequest,
  returnInternalServerError,
};
