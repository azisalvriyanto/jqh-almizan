const mongoose = require("mongoose");

const data_type = new mongoose.Schema({
	divisi: {
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
	penyunting: {
		type: String,
		trim: true
	},
	gambar: {
		type: String,
		trim: true
	},
	isi: {
		type: String,
		trim: true
	},
	sumber: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model("berita", data_type);