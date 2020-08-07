const express = require("express");
const router = express.Router();
const Users = require("../habitdb/queries");
// 0

let authenticate = (token, username) => {
  Users.findByToken(token)
    .then((user) => {
      if (user.username == username) {
        console.log(true)
        return true;
      } else {
        console.log(false)
        return false;
      }
    })
}

router.post("/signup", (req, res, next) => {
  const user = req.body;
  const username = req.body.username;
  Users.getSingle(username).then((found) => {
    if (found) {
      res.status(409).json({ error: "username already present" });
    } else {
      Users.hashPassword(user.password_digest)
        .then((hashedPassword) => {
          delete user.password;
          user.password_digest = hashedPassword;
        })
        .then(() => Users.createToken())
        .then((token) => (user.token = token))
        .then(() => Users.add(user))
        .then((user) => {
          delete user.password_digest;
          res.status(201).json({ message: "Signup Complete!" });
        })
        .catch((err) => console.error(err));
    }
  });
});


router.get("/getInfo/:username/", async(req, res, next) => {
 try {
  const token = req.query.token
  console.log(token)
  const username = req.params.username
  await authenticate(token, username)
  Users.getSingle(username)
     .then((foundUser) => {
      const userInfo = {
                user_id: foundUser.user_id,
                userName: foundUser.name,
                userSurname: foundUser.surname
              }
            
      return userInfo
     })
     .then((userInfo) =>  res.status(200).json({userInfo}))
} catch (error) {
  return next(error)
}


})
router.put("/logout", async(req, res, next) => {
  const username = req.body.username;
  const token = req.body.token;
  try {
    await authenticate(token, username)
    Users.getSingle(username)
       .then((foundUser) => {
       return Users.updateUserToken('loggedOut', foundUser.username)
       })
       .then(() => res.status(200).json({ message: "token deleted" }))
  } catch (error) {
    return next(error)
  }

});

router.post("/signin", (req, res, next) => {
  const userReq = req.body;
  let user;
  Users.getSingle(userReq.username)
    .then((foundUser) => {
      user = foundUser;
      return Users.checkPassword(userReq.password_digest, foundUser);
    })
    .then((res) => Users.createToken())
    .then((token) => Users.updateUserToken(token, user.username))
    .then(() => {
      delete user.password_digest;
      Users.getSingle(user.username)
      .then((updatedUser) => {
        const userInfo = {
          // user_id: user.user_id,
          // userName: user.name,
          // userSurname: user.surname,
          username:updatedUser.username,
          token:updatedUser.token
        };
        res.status(200).json({ userInfo });
      })
    })
    .catch((err) => res.status(404).json({ message: "either username and password did not mach" }));
});

router.put("/:username", (req, res, next) => {
  if (req.body.hasOwnProperty("username") || req.body.hasOwnProperty("userId")) {
    return res.status(422).json({
      error: "You cannot update username or id field",
    });
  }
  Users.update(req.params.username, req.body)
    .then(function () {
      return Users.getSingle(req.params.username);
    })
    .then(function (showUser) {
      res.status(200).json(showUser);
    })
    .catch(function (error) {
      next(error);
    });
});

router.delete("/:username", (req, res, next) => {
  Users.getSingle(req.params.username)
    .then(function (showUser) {
      Users.remove(req.params.username)
        .then(function () {
          res.status(200).json({message: "user deleted"});
        })
        .catch(function () {
          next(error);
        });
    })
    .catch(function (error) {
      next(error);
    });
});

module.exports = router;
