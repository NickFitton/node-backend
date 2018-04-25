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

module.exports = {
  promiseRequestBody,
  loadFile
};
