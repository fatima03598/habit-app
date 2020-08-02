const knex = require("./knex.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//User table
function Users() {
  return knex("userTable");
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
};

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString("base64"));
    });
  });
};



const findByToken = (token) => {
  return Users().where("token", token).first();
  // return database.raw("SELECT * FROM users WHERE token = ?", [token])
  //   .then((data) => data.rows[0])
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
      if (err) {
        reject(err);
      } else if (response) {
        resolve(response);
      } else {
        reject(new Error("Passwords do not match"));
      }
    });
  });
};

const updateUserToken = (token, username) => {
  return Users().where({ username: username }).update({ token: token });
};

function getSingle(username) {
  return Users().where("username", username).first();
}

function add(user) {
  return Users().insert(user, "user_id");
}

function update(username, updates) {
  return Users().where("username", username).update(updates);
}

function remove(username) {
  return Users().where("username", username).del();
}

//HabitTable

function Habits() {
  return knex("habitTable");
}

function getUserHabits(userid) {
  return Habits().where("userId", userid);
}

function addHabit(habit) {
  return Habits().insert(habit, "userId");
}

function deleteHabit(habit_id) {
  return Habits().where("habit_id", habit_id).del();
}

function HabitCompleteUpdate(habitId, time) {
  return Habits()
    .where("habit_id", habitId)
    .update({
      complete: knex.raw("array_append(complete, ?)", [time]),
    });
}
function Habitcomplete(habitId) {
  return Habits().where("habit_id", habitId).select("complete");
}

function HabitUpdate(habitId, updates) {
  return Habits().where("habit_id", habitId).update(updates);
}

module.exports = {
  getSingle: getSingle,
  add: add,
  update: update,
  remove: remove,
  hashPassword: hashPassword,
  createToken: createToken,
  checkPassword: checkPassword,
  updateUserToken: updateUserToken,
  findByToken:findByToken,
  getUserHabits: getUserHabits,
  addHabit: addHabit,
  deleteHabit: deleteHabit,
  HabitCompleteUpdate: HabitCompleteUpdate,
  Habitcomplete: Habitcomplete,
  HabitUpdate: HabitUpdate,
};
