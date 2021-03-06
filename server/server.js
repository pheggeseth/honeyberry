
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Route includes
const userRouter = require('./routes/user.router');
const storeRouter = require('./routes/store.router');
const itemRouter = require('./routes/item.router');
const categoryRouter = require('./routes/category.router');

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/store', storeRouter);
app.use('/api/item', itemRouter);
app.use('/api/category', categoryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
