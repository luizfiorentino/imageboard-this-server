const { Router } = require("express");
const { toJWT, toData } = require("../auth/auth");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "Plase enter valid email and password" });
    } else {
      res.send({
        jwt: toJWT({ userId: 1 }),
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
