const client = require('./client');

async function createUser({ name, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(name, password)
      VALUES($1, $2)
      RETURNING *;
    `,
      [name, password]
    );

    return user;
  } catch (ex) {
    console.log(`error creating user ${name}`);
    console.log(ex);
  }
}


module.exports = {
  createUser
}
