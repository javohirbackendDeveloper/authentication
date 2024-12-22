const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const crudSchema = new Schema(
  {
    user_id: {
      type: String,
      default: v4(),
    },
    username: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("crud", crudSchema);
