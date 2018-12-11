const mongoose = require("mongoose");

const data_type = new mongoose.Schema({
	username: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true
	},
	nama: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	tentang: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model("divisi", data_type);