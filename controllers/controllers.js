var app 		= require("../app");
var mongoose	= require("mongoose");

//Connect to the database
mongoose.connect("mongodb://azisalvriyanto:alvri69@ds227674.mlab.com:27674/jqh-almizan", { useNewUrlParser: true },  function (err) {
	if (err) throw err;
	console.log("=> Database telah dihubungkan.");
});

module.exports = function (app) {

	var nav_link, data;

	app.get("", function (req, res) {
		const profil		= require("../models/m_a_profil");
		const profil_id		= "5c0d435ee7179a2e270536b5";

		profil.findById(profil_id)
		.then(profil => {
			const berita		= require('../models/m_p_berita');

			berita.find()
			.then(berita => {
				res.render("umum/beranda", { layout: "umum/templat.ejs", data: profil, berita: berita });
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				});
			});
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/pendaftaran", function (req, res) {
		const profil		= require('../models/m_a_profil');

		profil.findById("5c0d435ee7179a2e270536b5")
		.then(data => {
			res.render("umum/pendaftaran", { layout: "umum/templat.ejs", data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.post("/pendaftaran", function (req, res) {
		const pendaftaran = require('../models/m_a_pendaftaran');

		pendaftaran.create(req.body)
		.then(data => {
			res.redirect("/");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/berita", function (req, res) {
		const berita		= require('../models/m_p_berita');

		berita.find()
		.then(data => {
			res.render("umum/berita", { layout: "umum/templat.ejs", data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/berita/:berita_id", function (req, res) {
		const berita		= require('../models/m_p_berita');
		const berita_id		= req.params.berita_id;

		berita.findById(berita_id)
		.then(data => {
			res.render("umum/berita_lihat", { layout: "umum/templat.ejs", data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	//INI DIBENERIN ASW!!!11!!!!1
	app.get("/pengurus", function (req, res) {
		res.render("pengurus/masuk", { layout: "pengurus/masuk" });
	});

	app.post("/pengurus", function (req, res) {
		res.redirect("/pengurus/dashboard");
	});
	//SAMPE SINI NJING11!!!!!!

	app.get("/pengurus/dashboard", function (req, res) {
		nav_link = {
			dashboard: "active",
			berita: "",
			galeri: ""
		};

		res.render("pengurus/dashboard", { layout: "pengurus/templat.ejs", judul: "dashboard", class_nav_link: nav_link });
	});

	app.get("/pengurus/berita", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "active",
			galeri: ""
		};

		const berita		= require('../models/m_p_berita');
		const divisi_nama	= "Tilawah";

		berita.find({ divisi: divisi_nama })
		.then(data => {
			res.render("pengurus/berita", { layout: "pengurus/templat.ejs", judul: "berita", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/pengurus/berita/tambah", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "active",
			galeri: ""
		};

		data = "";

		res.render("pengurus/berita_pengaturan", { layout: "pengurus/templat.ejs", judul: "berita", class_nav_link: nav_link, data: data });
	});

	app.post("/pengurus/berita/tambah", function (req, res) {
		const berita = require('../models/m_p_berita');

		berita.create(req.body)
		.then(data => {
			res.redirect("/pengurus/berita");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/pengurus/berita/:berita_id", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "active",
			galeri: ""
		};

		const berita	= require('../models/m_p_berita');
		const berita_id	= req.params.berita_id;

		berita.findById(berita_id)
		.then(data => {
			res.render("pengurus/berita_pengaturan", { layout: "pengurus/templat.ejs", judul: "berita", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: 'Profile ' + id + ' not found.'
			});
		});
	});

	app.post("/pengurus/berita/:berita_id", function (req, res) {
		const berita = require('../models/m_p_berita');
		const berita_id	= req.params.berita_id;

		berita.findByIdAndUpdate(berita_id, req.body, { new: true })
		.then(data => {
			res.redirect("/pengurus/berita/"+berita_id);
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/pengurus/berita/:berita_id/hapus", function (req, res) {
		const berita	= require('../models/m_p_berita');
		const berita_id	= req.params.berita_id;

		berita.findByIdAndRemove(berita_id)
		.then(data => {
			res.redirect("/pengurus/berita");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: 'Profile ' + id + ' not found.'
			});
		});
	});

	app.get("/pengurus/galeri", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "",
			galeri: "active"
		};

		res.render("pengurus/galeri", { layout: "pengurus/templat.ejs", judul: "galeri", class_nav_link: nav_link });
	});

	app.get("/pengurus/galeri/tambah", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "",
			galeri: "active"
		};

		res.render("pengurus/galeri_pengaturan", { layout: "pengurus/templat.ejs", judul: "galeri", class_nav_link: nav_link });
	});

	app.post("/pengurus/galeri/tambah", function (req, res) {
		const galeri = require('../models/m_p_galeri');

		galeri.create(req.body)
		.then(data => {
			res.redirect("/pengurus/galeri");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/pengurus/profil", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "",
			galeri: ""
		};

		const divisi		= require('../models/m_a_divisi');
		const anggota_id	= "5c0d1f0e0b5cb3273398bdd5";

		divisi.findById(anggota_id)
		.then(data => {
			res.render("pengurus/profil", { layout: "pengurus/templat.ejs", judul: "profil", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.post("/pengurus/profil", function (req, res) {
		const anggota 		= require('../models/m_a_anggota');
		const anggota_id	= "5c0d1f0e0b5cb3273398bdd5";

		anggota.findByIdAndUpdate(anggota_id, req.body, { new: true })
		.then(data => {
			res.redirect("/pengurus/profil");
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/pengurus/profil/kepengurusan", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "",
			galeri: "",
			kepengurusan: "active",
			keanggotaan: ""
		};

		res.render("pengurus/profil_kepengurusan", { layout: "pengurus/templat.ejs", judul: "profil", class_nav_link: nav_link });
	});

	app.get("/pengurus/profil/keanggotaan", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "",
			galeri: "",
			kepengurusan: "",
			keanggotaan: "active"
		};

		const anggota		= require('../models/m_a_anggota');
		const divisi_nama	= "Tilawah";

		anggota.find({ divisi: divisi_nama })
		.then(data => {
			res.render("pengurus/profil_keanggotaan", { layout: "pengurus/templat.ejs", judul: "profil", class_nav_link: nav_link, data: data })
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/pengurus/profil/keanggotaan/:keanggotaan_id", function (req, res) {
		nav_link = {
			dashboard: "",
			berita: "",
			galeri: "",
			kepengurusan: "",
			keanggotaan: "active"
		};

		res.render("pengurus/profil_keanggotaan_lihat", { layout: "pengurus/templat.ejs", judul: "keanggotaan", class_nav_link: nav_link });
	});

	app.get("/administrator", function (req, res) {
		res.render("administrator/masuk", { layout: "administrator/masuk" });
	});

	app.post("/administrator", function (req, res) {
		res.redirect("/administrator/dashboard");
	});

	app.get("/administrator/dashboard", function (req, res) {
		nav_link = {
			dashboard: "active",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: ""
		};

		res.render("administrator/dashboard", { layout: "administrator/templat.ejs", judul: "dashboard", class_nav_link: nav_link });
	});

	app.get("/administrator/keuangan", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "active",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: ""
		};

		res.render("administrator/keuangan", { layout: "administrator/templat.ejs", judul: "keuangan", class_nav_link: nav_link });
	});

	app.get("/administrator/pendaftaran", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "active",
			pengurusharian: "",
			divisi_tambah: ""
		};

		const pendaftaran	= require('../models/m_a_pendaftaran');

		pendaftaran.find()
		.then(data => {
			res.render("administrator/pendaftaran", { layout: "administrator/templat.ejs", judul: "pendaftaran anggota", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/pendaftaran/tambah", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "active",
			pengurusharian: "",
			divisi_tambah: ""
		};

		data = "";

		res.render("administrator/pendaftaran_pengaturan", { layout: "administrator/templat.ejs", judul: "pendaftaran anggota", class_nav_link: nav_link, data: data });
	});

	app.post("/administrator/pendaftaran/tambah", function (req, res) {
		const pendaftaran = require('../models/m_a_pendaftaran');

		pendaftaran.create(req.body)
		.then(data => {
			res.redirect("/administrator/pendaftaran");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/administrator/pendaftaran/:pendaftaran_id", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "active",
			pengurusharian: "",
			divisi_tambah: ""
		};

		const pendaftaran		= require('../models/m_a_pendaftaran');
		const pendaftaran_id	= req.params.pendaftaran_id;

		pendaftaran.findById(pendaftaran_id)
		.then(data => {
			res.render("administrator/pendaftaran_pengaturan", { layout: "administrator/templat.ejs", judul: "pendaftaran anggota", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: 'Profile ' + id + ' not found.'
			});
		});
	});

	app.get("/administrator/pendaftaran/:pendaftaran_id/hapus", function (req, res) {
		const pendaftaran		= require('../models/m_a_pendaftaran');
		const pendaftaran_id	= req.params.pendaftaran_id;

		pendaftaran.findByIdAndRemove(pendaftaran_id)
		.then(data => {
			res.redirect("/administrator/pendaftaran");
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.post("/administrator/pendaftaran/:pendaftaran_id", function (req, res) {
		const pendaftaran		= require('../models/m_a_pendaftaran');
		const pendaftaran_id	= req.params.pendaftaran_id;

		pendaftaran.findByIdAndUpdate(pendaftaran_id, req.body, { new: true })
		.then(data => {
			res.redirect("/administrator/pendaftaran/"+pendaftaran_id);
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/pengurusharian", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "active",
			divisi_tambah: ""
		};

		const anggota		= require('../models/m_a_anggota');
		const divisi_nama	= "Pengurus Harian";

		anggota.find({ divisi: divisi_nama })
		.then(data => {
			res.render("administrator/pengurusharian", { layout: "administrator/templat.ejs", judul: "Pengurus Harian", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/pengurusharian/tambah", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "active",
			divisi_tambah: ""
		};

		data = {
			divisi: "Pengurus Harian"
		};

		res.render("administrator/anggota", { layout: "administrator/templat.ejs", judul: "Pengurus Harian", class_nav_link: nav_link, data: data });
	});

	app.post("/administrator/pengurusharian/tambah", function (req, res) {		
		const anggota = require('../models/m_a_anggota');

		anggota.create(req.body)
		.then(data => {
			res.redirect("/administrator/pengurusharian");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/administrator/pengurusharian/:anggota_id", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "active",
			divisi_tambah: ""
		};

		const anggota 		= require('../models/m_a_anggota');
		const anggota_id	= req.params.anggota_id;

		anggota.findById(anggota_id)
		.then(data => {
			res.render("administrator/anggota", { layout: "administrator/templat.ejs", judul: "Pengurus Harian", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: 'Profile ' + id + ' not found.'
			});
		});
	});

	app.get("/administrator/pengurusharian/:anggota_id/hapus", function (req, res) {
		const anggota 		= require('../models/m_a_anggota');
		const anggota_id	= req.params.anggota_id

		anggota.findByIdAndRemove(anggota_id)
		.then(data => {
			res.redirect("/administrator/pengurusharian");
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/divisi/tambah", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: "active"
		};

		res.render("administrator/divisi_tambah", { layout: "administrator/templat.ejs", judul: "tambah divisi", class_nav_link: nav_link });
	});

	app.post("/administrator/divisi/tambah", function (req, res) {
		const divisi = require('../models/m_a_divisi');

		divisi.create(req.body)
		.then(data => {
			res.redirect("/administrator");
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/administrator/divisi/:divisi_id", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: ""
		};

		const divisi	= require('../models/m_a_divisi');
		const divisi_id	= req.params.divisi_id;

		divisi.findById(divisi_id)
		.then(x_divisi => {
			const divisi_nama	= x_divisi.nama;
			const anggota		= require('../models/m_a_anggota');
			
			anggota.find({ divisi: divisi_nama })
			.then(x_anggota => {
				res.render("administrator/divisi_pengaturan", { layout: "administrator/templat.ejs", judul: "Divisi "+divisi_nama, class_nav_link: nav_link, divisi: x_divisi, anggota: x_anggota });
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				});
			});
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.post("/administrator/divisi/:divisi_id", function (req, res) {
		const divisi 		= require('../models/m_a_divisi');
		const divisi_id		= req.params.divisi_id

		divisi.findByIdAndUpdate(divisi_id, req.body, { new: true })
		.then(data => {
			res.redirect("/administrator/divisi/"+divisi_id);
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/divisi/:divisi_id/tambah", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: ""
		};

		const divisi 		= require('../models/m_a_divisi');
		const divisi_id		= req.params.divisi_id

		divisi.findById(divisi_id)
		.then(data => {
			data = { "divisi": data.nama }
			res.render("administrator/anggota", { layout: "administrator/templat.ejs", judul: "Divisi "+data.divisi, class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.post("/administrator/divisi/:divisi_id/tambah", function (req, res) {
		const anggota	= require('../models/m_a_anggota');
		const divisi_id	= req.params.divisi_id;

		anggota.create(req.body)
		.then(data => {
			res.redirect("/administrator/divisi/"+divisi_id);
		})
		.catch(err => {
			res.json({
				confirmation: "fail",
				message: err.message
			});
		});
	});

	app.get("/administrator/divisi/:divisi_id/:anggota_id", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: ""
		};

		const anggota		= require('../models/m_a_anggota');
		const anggota_id	= req.params.anggota_id;

		anggota.findById(anggota_id)
		.then(data => {
			res.render("administrator/anggota", { layout: "administrator/templat.ejs", judul: "Divisi "+data.divisi, class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/divisi/:divisi_id/:anggota_id/hapus", function (req, res) {
		const anggota		= require('../models/m_a_anggota');
		const divisi_id		= req.params.divisi_id;
		const anggota_id	= req.params.anggota_id;

		anggota.findByIdAndRemove(anggota_id)
		.then(data => {
			res.redirect("/administrator/divisi/"+divisi_id);
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.post("/administrator/divisi/:divisi_id/:anggota_id", function (req, res) {
		const anggota		= require('../models/m_a_anggota');
		const anggota_id	= req.params.anggota_id;

		divisi.findByIdAndUpdate(anggota_id, req.body, { new: true })
		.then(data => {
			res.redirect("/administrator/divisi/"+data.id+"/"+anggota_id);
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.get("/administrator/profil", function (req, res) {
		nav_link = {
			dashboard: "",
			keuangan: "",
			pendaftaran: "",
			pengurusharian: "",
			divisi_tambah: ""
		};

		const profil 	= require('../models/m_a_profil');
		const profil_id	= "5c0d435ee7179a2e270536b5";

		profil.findById(profil_id)
		.then(data => {
			res.render("administrator/profil", { layout: "administrator/templat.ejs", judul: "profil", class_nav_link: nav_link, data: data });
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

	app.post("/administrator/profil", function (req, res) {
		const profil 	= require('../models/m_a_profil');
		const profil_id	= "5c0d435ee7179a2e270536b5";

		profil.findByIdAndUpdate(profil_id, req.body, { new: true })
		.then(data => {
			res.redirect("/administrator/profil");
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			});
		});
	});

};