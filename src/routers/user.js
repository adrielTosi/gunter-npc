const express = require("express");
const router = new express.Router();

const User = require("../models/user");
const validateUpdateFields = require("../utils/validateUpdateFields");
/**
 * @POST /users
 * @desc Creates a new user
 */
router.post("/users", async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @GET  /users
 * @desc Fetch all users
 */
router.get("/users", async (_, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @GET /users/:id
 * @desc Fetch one user by Id
 */
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @PATCH /users/:id
 * @desc update User by Id
 */
router.patch("/users/:id", async (req, res) => {
  const validFields = ["name", "email", "password"];
  const isValidUpdate = validateUpdateFields(req.body, validFields);

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update." });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).send();

    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

/**
 * @DELETE /users/:id
 * @desc Delete one user by Id
 */
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
