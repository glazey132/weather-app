const mongoose = require('mongoose');

var cityListSchema = mongoose.Schema({
	id: {
		type: Number
	}
});

var CityList = mongoose.model('CityList', cityListSchema);

module.exports = {
	CityList: CityList
};
