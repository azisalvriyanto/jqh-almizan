const mongoose = require("mongoose");

const data_type = new mongoose.Schema({
	nama_panjang: {
		type: String,
		trim: true
	},
	nama_pendek: {
		type: String,
		trim: true
	},
	foto: {
		type: String,
		trim: true
	},
	tanggal: {
		type: String,
		trim: true
	},
	moto: {
		type: String,
		trim: true
	},
	visi: {
		type: String,
		trim: true
	},
	misi: {
		type: String,
		trim: true
	},
	telepon: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	facebook: {
		type: String,
		trim: true
	},
	instagram: {
		type: String,
		trim: true
	},
	youtube: {
		type: String,
		trim: true
	},
	alamat: {
		type: String,
		trim: true
	},
	deskripsi: {
		type: String,
		trim: true
	},
	sejarah: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model("profil", data_type);