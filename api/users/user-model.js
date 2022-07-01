//just need get and get by user. should be about 8 lines

const db = require("../../data/dbConfig");

module.exports = { createUser, getByUsername };

async function createUser(user) {
  const [id] = await db("users").insert(user);
  return db("users").where({ id }).first();
}

async function getByUsername(username) {
  const found = await db("users").where({ username: username }).first();
  console.log(found, "found from inside model");
  return found;
}
