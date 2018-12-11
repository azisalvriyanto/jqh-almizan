const mongoose = require("mongoose");

const data_type = new mongoose.Schema({
	divisi: {
		type: String,
		trim: true
	},
	penyunting: {
		type: String,
		trim: true
	},
	judul: {
		type: String,
		trim: true
	},
	tanggal: {
		type: String,
		trim: true
	},
	keterangan: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model("galeri", data_type);