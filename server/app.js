const express = require('express');
const parser = require('body-parser');
const path = require('path');
const db = require('../database/app.js')
const session = require('express-session');
const yelp = require('../apis/yelp.js')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

let app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(parser.json());
app.use(session({
  secret: "2hard2know",
  resave: false,
  saveUnitialized: false
}))

var auth = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(404);
  }
}

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/food', auth, (req, res) => {
  var getFood = `SELECT images.path FROM images JOIN users ON images.user_id = users.id AND users.username = "${req.session.user}"`;
  db.query(getFood, (error, rows) => {
    if (error) {
      console.log("Couldn't get any food!", error);
    } else {
      console.log("Successfully retrieved food!", rows);
      res.send(rows);
    }
  });
});

app.post('/signup', (req, res) => {
  var values = [req.body.username, req.body.password];
  var insertUser = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.query(insertUser, values, (error, rows) => {
    if (error) {
      console.log("There was an error inserting the user", error);
    } else {
      console.log("Successfully Signed up!");
    }
  })
  res.redirect('/');
})

app.post('/login', (req, res) => {
  var selectUser = `SELECT username FROM users WHERE username = "${req.body.username}" AND password = "${req.body.password}"`;
  db.query(selectUser, (error, rows) => {
    if (error) {
      console.log("There was an error finding the user", error);
    } else if (rows.length === 0) {
      console.log("Failed to log in")
    } else {
      req.session.regenerate(() => {
        req.session.user = req.body.username;
        console.log(req.session.user);
        res.redirect('/');
      })
    }
  })
})

app.post('/upload', auth, (req, res) => {
  var values = [req.body.foodName, req.body.imagePath, req.body.tag]
  var insertFood = `INSERT INTO images (filename, path, tag, user_id) VALUES (?, ?, ?, (SELECT id FROM users WHERE username = "${req.session.user}"))`;
  db.query(insertFood, values, (error, rows) => {
    if (error) {
      console.log("There was an error inserting values", error);
    } else {
      console.log("Food uploaded!", rows);
    }
  });
  res.sendStatus(201);
});

app.post('/uploadFile', upload.array('photos', 10), (req, res) => {
  console.log("This is my uploadFile request", req.files);
})

app.post('/yelp', (req, res) => {
  yelp.getYelpResults(req.body.search, function(results) {
    res.send(results);
  })
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log('Connected to Port: ', port);
});

module.exports = {
  app
}
