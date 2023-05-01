const express = require('express');
const app = express()

const mongoose = require('mongoose');

const starbucks = require("../schema/Starbucks");

const router = express.Router();

router.get('/request', (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
  
    // find the nearest Starbucks location to the given latitude and longitude
    starbucks.find({'Latitude': latitude, 'Longitude': longitude})
    .then((data) => {
      res.status(200).json(data);
      console.log("Data: ", data);
    })
    .catch((error)=>{
      res.status(500).json({
        error: 'Internal Server Error!'
      })
      console.log("[Console]: ", error)
    })
  });

module.exports = router;