const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/MoneyList', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.error("Error connecting to MongoDB:", err));
db.once('open', () => console.log("Connected to MongoDB"));

const moneySchema = new mongoose.Schema({
    Category: String,
    Amount: Number,
    Info: String,
    Date: Date
});

const Money = mongoose.model('Money', moneySchema);

app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;

    const newData = new Money({
        Category: category_select,
        Amount: amount_input,
        Info: info,
        Date: date_input
    });

    newData.save((err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error inserting data");
            return;
        }
        console.log("Record Inserted Successfully:", data);
        res.status(200).send("Record Inserted Successfully");
    });
});

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*"
    });
    return res.redirect('index.html');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
