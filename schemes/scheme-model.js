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
function findSteps() {}

function add() {
  return db("scheme")
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

function remove() {
  return db("schemes").where({ id }).del();
}
