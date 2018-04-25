import {
  promiseRequestBody,
  returnJson,
  returnNotFound,
  returnNotImplemented,
} from "../../util/requestUtils";
import { User } from "../../service/model/user";
import { promiseGetUsers, promiseInsertUser } from "../../service/postgres";

const uuidv4 = require('uuid/v4');
const url = require('url');
const md5 = require('md5');

async function usersHandler(request, response) {
  const path = url.parse(request.url).pathname;

  // Because JS switches don't support multiple expressions, I had to use embedded switches
  switch (true) {
    case path === '/users':
      switch (request.method) {
        case 'POST':
          const body = JSON.parse(await promiseRequestBody(request));
          returnJson(response, await createUser(body), 201);
          break;
        case 'GET':
          returnJson(response, await getUsers(), 200);
          break;
        default:
          returnNotFound(response);
          break;
      }
      break;
    case path.includes('/users/'):
      const userId = path.split('/')[2];
      console.log('User ID: ' + userId);
      switch (request.method) {
        case 'PUT':
          returnNotImplemented(response);
          break;
        case 'DELETE':
          returnNotImplemented(response);
          break;
        case 'GET':
          returnNotImplemented(response);
          break;
        default:
          returnNotFound(response);
          break;
      }
      break;
    default:
      returnNotFound(response);
      break;
  }
}

async function createUser(body) {
  const newUser = new User(body.firstName, body.lastName, body.email, md5(body.password));
  newUser.id = uuidv4();
  const createdUser = await promiseInsertUser(newUser);
  newUser.createdAt = new Date(createdUser.created_at).getTime();
  newUser.updatedAt = new Date(createdUser.updated_at).getTime();
  newUser.password = undefined;
  console.log('User created: \'' + newUser.firstName.substr(0, 1) + '. ' + newUser.lastName + '\' with id: ' + newUser.id);
  return newUser;
}

async function getUsers() {
  const retrievedUsers = await promiseGetUsers();
  let users = [];
  for (let i=0; i<retrievedUsers.length; i++) {
    console.log(retrievedUsers[i]);
    let user = new User(retrievedUsers[i].first_name, retrievedUsers[i].last_name, retrievedUsers[i].email, undefined);
    user.id = retrievedUsers[i].id;
    user.createdAt = new Date(retrievedUsers[i].created_at).getTime();
    user.updatedAt = new Date(retrievedUsers[i].updated_at).getTime();
    users.push(user);
  }
  return users;
}

module.exports = {
  usersHandler
};
