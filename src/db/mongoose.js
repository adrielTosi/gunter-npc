const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/gunter-rpg-catalog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("Please enter valid email");
    },
    trim: true,
    lowercase: true
  }
});

const Npc = mongoose.model("Npc", {
  name: { type: String },
  description: { type: String }
});

const newNpc = new Npc({
  name: "Gunter",
  description: "Badass Paladin"
});

newNpc
  .save()
  .then(res => console.log(res))
  .catch(err => console.log(err));
