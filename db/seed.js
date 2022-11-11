const client = require('./client');
const {
  createUser
} = require('./users')

async function dropTables() {
  try {
    console.log("DROPPING TABLES");
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);
    console.log("DONE DROPPING TABLES");
  } catch (ex) {
    console.log("error dropping tables");
  }
}

async function createTables() {
  try {
    console.log("CREATING TABLES");
    await client.query(`
      CREATE TABLE users (
        name VARCHAR(255),
        password VARCHAR(255)
      );
    `);
    console.log("DONE CREATING TABLES");
  } catch (ex) {
    console.log("error creating tables");
  }
}

async function createInitialUsers() {
  try {
    console.log("CREATING INITIAL USERS");

    await createUser({ name: "joe", password: 123 });
    await createUser({ name: "aName", password: 123 });
    await createUser({ name: "blah", password: 123 });

    console.log("DONE CREATING INITIAL USERS");
  } catch (ex) {
    console.log(ex);
    console.log("error creating initial users");
  }
}

async function buildDB() {
  try {
    console.log('connecting to db')
    await client.connect();
    console.log('connected to db')
    console.log('DROPPING TABLES')
    await dropTables();
    await createTables();
    await createInitialUsers();
    const { rows: users } = await client.query(`SELECT * FROM users;`);
    console.log(users);
    console.log('disconnecting from db')
    client.end();
  } catch (ex) {
    console.log("error building the db");
  }
}

buildDB();
