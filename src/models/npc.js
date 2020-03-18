const mongoose = require("mongoose");

const Npc = mongoose.model("Npc", {
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  }
  // Later I want to be able to set  ´sub-descriptions´, which
  // will be added by the users n amount of times;
});

module.exports = Npc;
