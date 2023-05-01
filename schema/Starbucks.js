var mongoose = require('mongoose');

const starbucksSchema = new mongoose.Schema({
    Brand: String,
    'Store Number': String,
    'Store Name': String,
    'Ownership Type': String,
    'Street Address': String,
    City: String,
    'State/Province': String,
    Country: String,
    Postcode: String,
    'Phone Number': String,
    Timezone: String,
    Longitude: Number,
    Latitude: Number
});

module.exports = mongoose.model('starbucks', starbucksSchema);