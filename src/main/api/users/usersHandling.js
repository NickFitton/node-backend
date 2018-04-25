import { promiseRequestBody, returnJson, returnNotFound } from "../../util/requestUtils";
import { User } from "../../service/model/user";

const uuidv4 = require('uuid/v4');
const url = require('url');

async function usersHandler(request, response) {
  const path = url.parse(request.url).pathname;

  // Because JS switches don't support multiple expressions, I had to use embedded switches
  switch (true) {
    case path === '/users':
      switch (request.method) {
        case 'POST':
          const body = JSON.parse(await promiseRequestBody(request));
          returnJson(response, createUser(body), 201);
          break;
        case 'GET':
          response.statusCode = 501;
          response.end();
          break;
        default:
          returnNotFound(response);
          break;
      }
      break;
    case path.includes('/users/'):
      const userId = path.split('/')[2];
      console.log('User ID: ' + userId);
      break;
    default:
      returnNotFound(response);
      break;
  }
}

function createUser(body) {
  const newUser = new User(body.firstName, body.lastName, body.email, body.password);
  newUser.id = uuidv4();
  newUser.createdAt = Date.now();
  newUser.updatedAt = Date.now();
  console.log('User created: \'' + newUser.firstName.substr(0, 1) + '. ' + newUser.lastName + '\' with id: ' + newUser.id);
  return newUser;
}

module.exports = {
  usersHandler
};
