const mongoose = require("mongoose");

const data_type = new mongoose.Schema({
	divisi: {
		type: String,
		trim: true
	},
	jabatan: {
		type: String,
		trim: true
	},
	nama: {
		type: String,
		trim: true
	},
	jkelamin: {
		type: String,
		trim: true
	},
	lahir_tempat: {
		type: String,
		trim: true
	},
	lahir_tanggal: {
		type: String,
		trim: true
	},
	telepon: {
		type: String,
		trim: true
	},
	nim: {
		type: Number,
		trim: true
	},
	prodi: {
		type: String,
		trim: true
	},
	fakultas: {
		type: String,
		trim: true
	},
	tentang: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model("anggota", data_type);