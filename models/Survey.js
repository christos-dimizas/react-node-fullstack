/**
 * Survey Model
 * */

const mongoose = require('mongoose');
const { Schema } = mongoose;
// require sub-document collections
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0 },
    no: {type: Number, default: 0 },
    // Add reference (like a foreign index) to User model
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSend: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);