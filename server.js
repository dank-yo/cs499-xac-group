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
    const userLat = req.body.latitude;
    const userLng = req.body.longitude;
    const R = 6371; // Earth's radius in km
    starbucks
      .find({ 'State/Province': 'IN' })
      .then((results) => {
        const locationsWithDistance = results.map((location) => {
          const lat = location.Latitude;
          const lng = location.Longitude;
          const dLat = ((lat - userLat) * Math.PI) / 180;
          const dLng = ((lng - userLng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((userLat * Math.PI) / 180) *
              Math.cos((lat * Math.PI) / 180) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return { ...location.toObject(), distance }; // Add distance field to location object
        });
        const sortedLocations = locationsWithDistance.sort(
          (a, b) => a.distance - b.distance
        );
        const closestLocations = sortedLocations.slice(0, 10);
        res.send(closestLocations);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching Starbucks locations');
      });
  });
  