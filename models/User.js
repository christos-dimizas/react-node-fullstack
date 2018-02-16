/**
 * User Model
 * */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    emailsList: Array,
});

mongoose.model('users', userSchema);

