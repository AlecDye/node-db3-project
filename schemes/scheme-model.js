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

// success
function findSteps(id) {
  return db
    .select("*")
    .from("schemes")
    .join("steps", "schemes.id", "=", "steps.scheme_id");
}

// success
function add(schemeData) {
  return db("schemes")
    .insert(schemeData, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function addStep(stepData) {
  return db("steps")
    .insert(stepData, "id")
    .then((ids) => {
      const [id] = ids;
      return findSteps(id);
    });
}

// success
function update(changes, id) {
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
