const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
};

// success
function find() {
  return db("schemes");
}

// success
function findById(id) {
  return db("schemes").where({ id }).first();
}

// steps are another table inside schemes db
function findSteps(id) {
  return db
    .select("*")
    .from("schemes")
    .join("steps", "scheme.id", "steps.scheme.id")
    .where("schemes.id", id);
}

// success
function add(schemeData) {
  return db("schemes")
    .insert(schemeData, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function addStep() {}

function update(id, changes) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

// success
function remove(id) {
  return db("schemes").where({ id }).del();
}
