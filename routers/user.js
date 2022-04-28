const { Router } = require("express");
const { Route } = require("express");
const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  const allUsers = await User.findAll({ raw: true });
  res.send(allUsers);
  next(e);
});

// Create a new user
router.post("/", async (req, res, next) => {
  // const { email, password, fullName } = req.body;
  const newUser = await User.create(req.body);
  res.send(newUser);
});

// Also works
// router.post("/", async (req, res, next) => {
//     try {
//       const { email, password, fullName } = req.body;
//       if (!email || !password || !fullName) {
//         res.status(400).send("missing parameters");
//       } else {
//         const newUser = await User.create({
//           email,
//           password,
//           fullName,
//         });
// OR : const newUser = await User.create(req.body)
//         res.json(newUser);
//       }
//     } catch (e) {
//       next(e);
//     }
//   });

module.exports = router;
