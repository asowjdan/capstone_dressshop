const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 3001;

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "shop",
    password: "shop",
    database: "shop",
});

db.connect();

db.query('select * from users', (err, rows) => {
    if (err) throw err;
    console.log('DB 연결성공');
  });

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use(express.urlencoded({ extended: true}))

app.listen(PORT, ()=> {
    console.log(`${PORT} 포트에서 연결중`)
})

app.get("/api/select", (req,res) => {
    const sqlQuery = "select * from users";
    db.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/login", (req,res) => {

    var id = req.body.id;
    var pw = req.body.pw;

    const sqlQuery = "select count(*) from users where id =? and pw =?;";

    db.query(sqlQuery, [id, pw], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});