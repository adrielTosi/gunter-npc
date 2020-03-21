const express = require("express");
const router = new express.Router();

const Npc = require("../models/npc");
const validateUpdateFields = require("../utils/validateUpdateFields");
/**
 * @POST /npcs
 * @desc Creates a new Npc
 */
router.post("/npcs", async (req, res) => {
  const newNpc = new Npc(req.body);
  try {
    await newNpc.save();
    res.status(201).send(newNpc);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @GET /npcs
 * @desc fetch all npcs
 */
router.get("/npcs", async (req, res) => {
  try {
    const npcs = await Npc.find({});
    res.send(npcs);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @GET /npcs/:id
 * @desc fetch one npc by Id
 */
router.get("/npcs/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const npc = await Npc.findById(_id);
    if (!npc) return res.status(404).send();
    res.send(npc);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * @PATCH /npcs/:id
 * @desc update one npc by Id
 */
router.patch("/npcs/:id", async (req, res) => {
  const validFields = ["name", "about"];
  const { isValidUpdate, updatesArray } = validateUpdateFields(
    req.body,
    validFields
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update." });
  }

  try {
    const npc = await Npc.findById(req.params.id);
    if (!npc) return res.status(404).send();

    updatesArray.forEach(update => (npc[update] = req.body[update]));
    npc.save();

    res.send(npc);
  } catch (e) {
    res.status(400).send();
  }
});
/**
 * @DELETE /npcs/:id
 * @desc Delete one NPC by Id
 */
router.delete("/npcs/:id", async (req, res) => {
  try {
    const npc = await Npc.findByIdAndDelete(req.params.id);
    if (!npc) return res.status(404).send(npc);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
