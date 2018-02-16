const keys = require('./config/keys.js');

const express = require('express');
const mongoose = require('mongoose');
// auto run passport google strategy.
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

const app = express();
// require routing process and assign routing to express app.
require('./routes/authRoute.js')(app);
// set listen port for app.
const PORT = process.env.PORT || 5000;
app.listen(PORT);