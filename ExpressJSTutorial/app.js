const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const router = require('./routes/api/members');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

/* app.get('/', (req, res) => {
  // res.send('<h1>Hello</h1>');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */

// call middleware
// app.use(logger);

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

// Members api routes
app.use('/api/members', router);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));