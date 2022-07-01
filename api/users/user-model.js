//just need get and get by user. should be about 8 lines

const db = require("../../data/dbConfig");

module.exports = { createUser };

async function createUser(user) {
  const [id] = await db("users").insert(user);
  return db("users").where({ id }).first();
}
