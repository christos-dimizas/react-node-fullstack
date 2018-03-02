/**
 * Recipient Model
 * */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: {type: Boolean, default: false}
});

// Since this DB document works like a sub-document collection we export it instead of adding it to mongoose.
module.exports = recipientSchema;