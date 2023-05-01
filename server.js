const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express()

app.use(express.static("public"));

app.use(bodyParser.json());


app.listen(3000, () => {
    console.log("Server started on port 3000");
});

mongoose.connect('mongodb://127.0.0.1:27014/geography', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB on Port 27014');
}).catch((error) => {
    console.error(error);
});

const starbucks = require("./schema/Starbucks");

app.post("/api/request", (req, res) => {
    const lat = req.body.latitude;
    console.log(lat);
    const long = req.body.longitude;
    console.log(long);
    starbucks.find(
    {
        'State/Province': "IN",
    }
    )
    .sort({ distance: 1 }) // Sort by distance in ascending order
    .limit(10) // Return only the 10 closest locations
    .then((results) => {
    res.send(results);
    console.log(results)
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send("Error fetching Starbucks locations");
    });
}); 