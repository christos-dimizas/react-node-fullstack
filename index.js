const keys = require('./config/keys.js');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


// Models (declared before been used)
require('./models/User.js');
// auto run passport google strategy.
require('./services/passport.js');
// connect with DB
mongoose.connect(keys.mongoURI);

const app = express();

// init middlewares (cookie session, body-parser)
app.use(bodyParser.json());
app.use(
    cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

// tell passportJS to use cookie session.
app.use(passport.initialize());
app.use(passport.session());

// require routing process and assign routing to express app.
require('./routes/authRoute.js')(app);
require('./routes/billingRoute')(app);
// set listen port for app.
const PORT = process.env.PORT || 5000;
app.listen(PORT);