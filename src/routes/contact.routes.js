const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  const contact = await Contact.find();
  res.json(contact);
});

router.get("/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
});

router.post("/", async (req, res) => {
  const { name, number, email } = req.body;
  const contact = new Contact({ name, number, email });
  await contact.save();
  res.json({
    status: "recivied",
  });
});

router.put("/:id", async (req, res) => {
  const { name, number, email } = req.body;
  const newContact = { name, number, email };
  await Contact.findByIdAndUpdate(req.params.id, newContact);
  res.json({ status: "recivied" });
});

router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndRemove(req.params.id);
  res.json({ status: "remove..." });
});

module.exports = router;
