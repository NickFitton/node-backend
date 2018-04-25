# Boilerplate Backend - NodeJS Pure
The intention of this repository is to create a Node backend server that follows the boilerplate guidlines without using a framework such as [express](http://expressjs.com/).

## Setup
### Postgres
Postgres is needed for running the service successfully and sending info to the database.

### Packages
Run `npm install` to gather all the dependencies.

### Startup
To start up the service run `npm start`.

## TODO
- [x] Routing for user endpoints
- [ ] Endpoint functionality:
  - [x] /users GET
  - [x] /users POST
  - [ ] /users/{userId} GET
  - [ ] /users/{userId} PUT
  - [ ] /users/{userId} DELETE
- [ ] Database connection
- [ ] Testing
- [ ] Error Handling

## Dependencies
* Babel
  * Babel has been used for functionality such as `import`.
* uuid
  * `uuid` has been used to generate a uuid for each created user.
* md5
  * For hashing the users password on the database
* pg
  * For connecting to postgres
