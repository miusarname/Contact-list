const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema of Contacts
const ContactsSchema = new Schema({
  name: { type: String, require: true },
  number: { type: Number, require: true },
  email: { type: String, require: false },
});

module.exports = mongoose.model("Contact", ContactsSchema);
