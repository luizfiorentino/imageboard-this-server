const { Router } = require("express");

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

// Post a new image
router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send({ ooops: "title and url must be infomed" });
    } else {
      const newImage = await Image.create(req.body);
      res.send(newImage);
    }
  } catch (e) {
    next(e);
  }
});

// Get a specific image
router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = req.params.imageId;
    const thisImage = await Image.findByPk(imageId);
    if (!thisImage) {
      res
        .status(404)
        .send({ oops: "the informed id does not match any of the images" });
    } else {
      res.send(thisImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
