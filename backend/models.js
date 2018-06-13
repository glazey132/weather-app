const mongoose = require("mongoose");

var cityListSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  }
});

var CityListItem = mongoose.model("Citylist", cityListSchema, "citylist");

module.exports = {
  CityListItem
};
