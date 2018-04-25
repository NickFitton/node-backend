import { usersHandler } from "./users/usersHandling";
import { User } from '../service/model/user';
import { promiseRequestBody, returnPageNotFound } from '../util/requestUtils';
import url from "url";

export async function handleRequest(request, response) {
  const path = url.parse(request.url).pathname;

  switch (path.split('/')[1]) {
    case 'users':
      usersHandler(request, response);
      break;
    case 'test':
      let body = JSON.parse(await promiseRequestBody(request));
      const newUser = new User(body.firstName, body.lastName, body.email, body.password);
      response.statusCode = 201;
      response.write(JSON.stringify(newUser));
      response.end();
      break;
    default:
      returnPageNotFound(response);
  }
}
