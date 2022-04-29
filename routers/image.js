const { Router } = require("express");
const { user } = require("pg/lib/defaults");
const { toJWT, toData } = require("../auth/auth");
const User = require("../models").user;

const Image = require("../models").image;
const router = new Router();

// Get all images
router.get("/", async (req, res, next) => {
  try {
    const allImages = await Image.findAll({ raw: true });
    res.send(allImages);
  } catch (e) {
    next(e);
  }
});

router.get("/test", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send("Please inform valid credentials");
  }
});

// Creating an authentication route for images
// router.get("/login/test", async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).send({
//       message: "Please provide valid email and password",
//     });
//   } else if (bcrypt.compareSync(password, user.password)) {
//     const jwt = toJWT({ userId: user.id });
//     res.send({ jwt });
//   } else {
//     res.status(400).send({
//       message: "Incorrect passowrd",
//     });
//   }
// });

//       const passwordMatch = bycript.compareSync(password, user.password);
//     }
//     if (passwordMatch) {
//       res.send("Welcome to the imageboard");
//     } else {
//       res.send("Your credentials don't match any entry in our database");
//       res.send({ jwt: toJWT({ userId: 1 }) });
//     }
//   }
//   const auth =
//     req.headers.authorization && req.headers.authorization.split(" ");
//   if (auth && auth[0] === "Bearer" && auth[1]) {
//     try {
//       const data = toData(auth[1]);
//       const allImages = await Image.findAll();
//       res.json(allImages);
//     } catch (e) {
//       res.status(400).send("Invalid JWT token");
//     }
//   } else {
//     res.status(401).send({ message: "Please provide valid credentials" });
//   }
// });

// // Post a new image
// router.post("/", async (req, res, next) => {
//   try {
//     const { title, url } = req.body;
//     if (!title || !url) {
//       res.status(400).send({ ooops: "title and url must be infomed" });
//     } else {
//       const newImage = await Image.create(req.body);
//       res.send(newImage);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// // Get a specific image
// router.get("/:imageId", async (req, res, next) => {
//   try {
//     const imageId = req.params.imageId;
//     const thisImage = await Image.findByPk(imageId);
//     if (!thisImage) {
//       res
//         .status(404)
//         .send({ oops: "the informed id does not match any of the images" });
//     } else {
//       res.send(thisImage);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
