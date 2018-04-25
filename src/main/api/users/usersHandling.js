import {
  promiseRequestBody,
  returnBadRequest,
  returnInternalServerError,
  returnJson,
  returnNotFound,
  returnNotImplemented,
} from "../../util/requestUtils";
import { User } from "../../service/model/user";
import {
  promiseGetUser,
  promiseGetUsers,
  promiseInsertUser
} from "../../service/postgres";

const uuidv4 = require('uuid/v4');
const url = require('url');
const md5 = require('md5');
const validate = require('uuid-validate');

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
      if (validate(userId)) {
        switch (request.method) {
          case 'PUT':
            returnNotImplemented(response);
            break;
          case 'DELETE':
            returnNotImplemented(response);
            break;
          case 'GET':
            try {
              returnJson(response, await getUser(userId), 200);
            } catch (error) {
              if (error.toString().includes("not found")) {
                return returnNotFound(response, error.toString());
              } else {
                return returnInternalServerError(response, error.toString());
              }
            }
            break;
          default:
            returnNotFound(response);
            break;
        }
      } else {
        returnBadRequest(response, "Given user ID was invalid.");
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
  let users = [];
  const retrievedUsers = await promiseGetUsers();
  retrievedUsers.forEach(retrievedUser => {
    users.push(userEntityToModel(retrievedUser));
  });
  return users;
}

async function getUser(userId) {
  let retrievedUser = await promiseGetUser(userId).then(
      result => {
        return result;
      }, error => {
        throw error;
      });
  return userEntityToModel(retrievedUser);
}

function userEntityToModel(userEntity) {
  let user = new User(userEntity.first_name, userEntity.last_name, userEntity.email, undefined);
  user.id = userEntity.id;
  user.createdAt = new Date(userEntity.created_at).getTime();
  user.updatedAt = new Date(userEntity.updated_at).getTime();
  return user;
}

module.exports = {
  usersHandler
};
