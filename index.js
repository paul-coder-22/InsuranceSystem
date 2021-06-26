const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


mongoose.connect('mongodb+srv://admin:Test123@cluster0.lwcjb.mongodb.net/insuranceDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const insuranceSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    currentPass: String,
    rePass: String,
    BirthMonth: String,
    BirthDay: String,
    BirthYear: String,
    gender: String,
    phone: Number
}, { collection: "users" });
const User = mongoose.model("user", insuranceSchema);
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email: email, currentPass: password }, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            if (docs.length === 0) {

                res.sendFile(__dirname + "/public/html/register.html");
            }
            else {
                res.sendFile(__dirname + "/public/html/welcome.html");
            }
        }
    });
});

app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const passowrd1 = req.body.password1;
    const password2 = req.body.password2;
    const BirthMonth = req.body.BirthMonth;
    const BirthDay = req.body.BirthDay;
    const BirthYear = req.body.BirthYear;
    const gender = req.body.gender;
    const phone = req.body.phone;

    const data = new User({
        "name": name,
        "email": email,
        "username": username,
        "currentPass": passowrd1,
        "rePass": password2,
        "BirthMonth": BirthMonth,
        "BirthDay": BirthDay,
        "BirthYear": BirthYear,
        "gender": gender,
        "phone": phone
    });
    db.collection("users").insertOne(data);
    res.redirect("/")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html")
})
app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/public/html/register.html")
})
app.get("/login", function (req, res) {

    res.redirect("/");
})
app.listen(port, function () {
    console.log("server started");
})