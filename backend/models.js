const mongoose = require('mongoose');

var cityListItemSchema = mongoose.Schema({
	id: { type: Number },
	name: { type: String },
	country: { type: String },
	coord: { type: [{
		lon: { type: Number },
		lat: { type: Number }
	}] }
});

var CityListItem = mongoose.model('citylist', cityListItemSchema);

module.exports = {
	CityListItem: CityListItem
};
