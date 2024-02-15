const db = require("../database/models");
const Pasien = db.Pasien;

exports.create = (req, res) => {
    const pasien = {
        name: req.body.name,
        jeniskelamin: req.body.jeniskelamin,
        alamat: req.body.alamat,
        tglLahir: req.body.tglLahir,
        noTelp: req.body.noTelp,
    };

    Pasien.create(pasien).then((data) => {
        res.json({
            message: "Pengguna anyar berhasil dijieun!",
            data: data,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Aya masalah pas maneh nambah pasien.",
            data: null,
        });
    });
};

exports.findAll = (req, res) => {
    Pasien.findAll({
        attributes: { exclude: ['password'] }
    }).then((pasiens) => {
        res.json({
            message: "Pasien retrieved successfully.",
            data: pasiens,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving pasiens.",
            data: null,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    const pasienData = {
        name: req.body.name,
        jeniskelamin: req.body.email,
        alamat: req.body.alamat,
        tglLahir: req.body.tglLahir,
        noTelp: req.body.noTelp,
    };

    Pasien.update(pasienData, {
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Pasien updated successfully.",
                data: pasienData, // Return the updated data
            });
        } else {
            res.json({
                message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
                data: pasienData,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the user.",
            data: null,
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Pasien.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Pengguna tiasa dipaehan",
                data: req.body,
            });
        } else {
            res.json({
                message: `Cannot delete user with id=${id}. Maybe user was not found!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the user.",
            data: null,
        });
    });
};

exports.findOne = (req, res) => {
    Pasien.findByPk(req.params.id).then((pasien) => {
        res.json({
            message: "pengguna bisa di tempokeun",
            data: pasien,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving pasien.",
            data: null,
        });
    });
};