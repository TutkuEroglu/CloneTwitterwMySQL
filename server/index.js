const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mywebsites",
});

app.use(cors("*"));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 60 * 60 * 24,
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hellooooğ");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE USERNAME = ? AND PASSWORD = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Yanlış kombinasyon" });
      }
    }
  );
});

app.post("/api/create", (req, res) => {
  const username = req.body.username;
  const text = req.body.text;

  db.query(
    "INSERT INTO tweets (OWNER, TEXT) VALUES (?,?)",
    [username, text],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      } else {
        db.query(
          "SELECT * FROM tweets WHERE TEXTID = ?",
          [result.insertId],
          (err2, data) => {
            if (err2) throw err2;
            res.send({ message: "success", data: data });
          }
        );
      }
    }
  );
});

app.get("/api/getTweets", (req, res) => {
  db.query("SELECT * FROM tweets ORDER BY TEXTID DESC", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/getUserTweets", (req, res) => {
  const username = req.body.username;

  db.query(
    "SELECT * FROM tweets WHERE OWNER = ? ORDER BY TEXTID DESC",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      } else {
        res.send({ message: "success", data: result });
      }
    }
  );
});

app.post("/api/profileinfo", (req, res) => {
  const USERID = req.body.USERID;
  const NAME = req.body.NAME;
  const INFORMATION = req.body.INFORMATION;
  const LOCATION = req.body.LOCATION;
  const WEBSITE = req.body.WEBSITE;
  const BIRTHDAY = req.body.BIRTHDAY;

  db.query(
    "UPDATE users SET NAME = ? , INFORMATION = ?, LOCATION = ?, WEBSITE = ?, BIRTHDAY = ? WHERE USERID = ?",
    [NAME, INFORMATION, LOCATION, WEBSITE, BIRTHDAY, USERID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      } else {
        db.query(
          "SELECT * FROM users WHERE USERID = ?",
          [USERID],
          (err2, data) => {
            if (err2) throw err2;
            res.send({ message: "success", data: data });
          }
        );
      }
    }
  );
});

app.post("/api/like/:id", (req, res) => {
  const id = req.params.id;
  const isLiked = req.body.isLiked;
  db.query(
    "UPDATE tweets SET LIKEAMOUNT = LIKEAMOUNT + 1, ISLIKED = ? WHERE TEXTID = ?",
    [isLiked, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      } else {
        db.query(
          "SELECT * FROM tweets WHERE TEXTID = ?",
          [id],
          (err2, data) => {
            if (err2) throw err2;
            res.send({ message: "success", data: data });
          }
        );
      }
    }
  );
});

app.post("/api/dislike/:id", (req, res) => {
  const id = req.params.id;
  const isLiked = req.body.isLiked;
  db.query(
    "UPDATE tweets SET LIKEAMOUNT = LIKEAMOUNT - 1, ISLIKED = ? WHERE TEXTID = ?",
    [isLiked, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      } else {
        db.query(
          "SELECT * FROM tweets WHERE TEXTID = ?",
          [id],
          (err2, data) => {
            if (err2) throw err2;
            res.send({ message: "success", data: data });
          }
        );
      }
    }
  );
});
