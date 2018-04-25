require("babel-core").transform("code");

const url = require('url');
import { User } from './service/model/user';
import { promiseRequestBody, loadFile } from './util/requestUtils';

async function handleRequest(request, response) {
  const path = url.parse(request.url).pathname;
  console.log(path);

  switch (path.split('/')[1]) {
    case 'users':
      let body = JSON.parse(await promiseRequestBody(request));
      const newUser = new User(body.firstName, body.lastName, body.email, body.password);
      newUser.createdAt = Date.now();
      newUser.updatedAt = Date.now();
      response.statusCode = 201;
      response.write(JSON.stringify(newUser));
      response.end();
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      loadFile('./src/main/page/not_found.html', response);
      response.statusCode = 404;
  }
}

module.exports = {
  handleRequest
};
