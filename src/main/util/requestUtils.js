import fs from "fs";

export function promiseRequestBody(request) {
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

export function loadFile(path, response) {
  fs.readFile(path, null, (error, data) => {
    if (error) {
      console.log(error);
      response.statusCode = 404;
      response.write('File not found!');
    } else {
      response.write(data);
    }
    response.end();
  });
}

export function returnPageNotFound(response) {
  response.setHeader('Content-Type', 'text/html');
  loadFile('./src/main/page/not_found.html', response);
  response.statusCode = 404;
}

export function returnNotFound(response, reason) {
  response.statusCode = 404;
  response.write(reason);
  response.end();
}

export function returnNotImplemented(response) {
  response.statusCode = 501;
  response.end();
}

export function returnBadRequest(response, reason) {
  response.statusCode = 400;
  response.write(reason);
  response.end();
}

export function returnInternalServerError(response, reason) {
  response.statusCode = 500;
  response.write(reason);
  response.end();
}

export function returnJson(response, json, statusCode) {
  response.statusCode = statusCode;
  response.write(JSON.stringify(json));
  response.end();
}
