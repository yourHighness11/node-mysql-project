const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 3000;

//Parse json data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_db",
});

//Connect Database
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connection Successfull.");
  }
});

//Fetching Data
app.get("/get-posts", (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(results);
      //Place your code here
      res.json({
        DATA: results,
      });
    }
  });
});

//Uploading Data
app.post("/upload-post", (req, res) => {
  const { user_id, filename } = req.body;
  const sql = `INSERT INTO posts (user_id, filename) VALUES ('${user_id}', '${filename}')`;
  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      //Place your code here
      res.json({
        message: "Data inserted successfully, check database.",
      });
    }
  });
});

app.listen(port, () => console.log(`Server running on ${port}`));
