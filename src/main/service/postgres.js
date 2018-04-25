import { Pool } from "pg";


const config = {
  user: 'boilerplate_user',
  host: 'localhost',
  database: 'boilerplate_db',
  password: '1234',
  port: '5432',
};

export async function promiseInsertUser(user) {
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

export async function promiseGetUsers() {
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

export async function promiseGetUser(userId) {
  return new Promise((resolve, reject) => {
    const pool = new Pool(config);
    pool.query(`SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE id='${userId}'`, (err, res) => {
      if (err) {
        console.error(err);
      }
      if (res === undefined) {
        reject(new Error("Postgres failed, returned undefined"));
      } else if (res.rows.length !== 1) {
        reject(new Error(`User not found for uuid: ${userId}`));
      } else {
        resolve(res.rows[0]);
      }
      pool.end();
    });
  });
}
