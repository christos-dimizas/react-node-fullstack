const keys = require('./config/keys.js');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


// Models (declared before been used)
require('./models/User.js');
require('./models/Survey.js');

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
require('./routes/billingRoute.js')(app);
require('./routes/surveyRoute.js')(app);

// IN CASE OF PRODUCTION
if(process.env.NODE_ENV == 'production') {
    // Express will serve up production assets
    // like out main.js, or main.css
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route (or all above route fail to be found)
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(___dirname, 'client', 'build', 'indec.html'));
    });
}

// set listen port for app.
const PORT = process.env.PORT || 5000;
app.listen(PORT);