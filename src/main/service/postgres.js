const {Pool, Client} = require('pg');

const config = {
  user: 'boilerplate_user',
  host: 'localhost',
  database: 'boilerplate_db',
  password: '1234',
  port: '5432',
};

async function promiseInsertUser(user) {
  return new Promise(resolve => {
    const pool = new Pool(config);
    pool.query(`INSERT INTO users (id, first_name, last_name, email, password) VALUES (\'${user.id}\', \'${user.firstName}\', \'${user.lastName}\', \'${user.email}\', \'${user.password}\') RETURNING *`, (err, res) => {
      if (err) {
        console.error(err);
      }
      resolve(res.rows[0]);
      pool.end();
    });
  });
}

async function promiseGetUsers() {
  return new Promise(resolve => {
    const pool = new Pool(config);
    pool.query(`SELECT id, first_name, last_name, email, created_at, updated_at FROM users`, (err, res) => {
      if (err) {
        console.error(err);
      }
      resolve(res.rows);
      pool.end();
    });
  });
}

module.exports = {
  promiseInsertUser,
  promiseGetUsers,
};
