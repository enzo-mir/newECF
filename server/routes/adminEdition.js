//require("dotenv").config(); /* retirer au build */
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

module.exports = async function adminEdition(app) {
    app.post("/adminImageEdited", (req, res) => {
        let response = req.body;
        if (response.add == true) {
            app.mysql.query(
                `INSERT INTO images(id, titre, description, lien, publicId) VALUES (NULL,"${response.titre}","${response.desc}","${response.newUrl}","${response.pubId}")`,
                (err, valid) => {
                    if (valid) {
                        app.mysql.query(
                            "SELECT `id`, `titre`, `description`, `lien` FROM `images`",
                            (er, v) => {
                                let table = [];
                                v.map((elem) => {
                                    table.push(elem);
                                });
                                res
                                    .send({ valid: table, message: "Photo ajoué !" })
                                    .status(200);
                            }
                        );
                    } else {
                        res.send({ error: err }).status(400);
                    }
                }
            );
        } else {
            if ((response.oldUrl === response.newUrl) != null) {
                app.mysql.query(
                    `UPDATE images SET titre='${response.titre}',description='${response.desc}',lien='${response.newUrl}' WHERE lien ='${response.oldUrl}'`,
                    (err, valid) => {
                        if (valid) {
                            app.mysql.query(
                                "SELECT `id`, `titre`, `description`, `lien` FROM `images`",
                                (er, v) => {
                                    let table = [];
                                    v.map((elem) => {
                                        table.push(elem);
                                    });
                                    res
                                        .send({ valid: table, message: "Photo modifié !" })
                                        .status(200);
                                }
                            );
                        } else {
                            res.send({ error: err }).status(400);
                        }
                    }
                );
            } else if (response.oldUrl != response.newUrl) {
                app.mysql.query(
                    `SELECT * from images WHERE lien ='${response.oldUrl}'`,
                    (error, success) => {
                        if (success) {
                            cloudinary.api.delete_resources(
                                `${success[0].publicId}`,
                                {
                                    resource_type: "image",
                                },
                                (err, valid) => {
                                    if (valid) {
                                        app.mysql.query(
                                            "SELECT `id`, `titre`, `description`, `lien` FROM `images`",
                                            (er, v) => {
                                                let table = [];
                                                v.map((elem) => {
                                                    table.push(elem);
                                                });
                                                res
                                                    .send({ valid: table, message: "Photo modifié !" })
                                                    .status(200);
                                            }
                                        );
                                    } else {
                                        res.send({ error: err }).status(400);
                                    }
                                }
                            );
                        }
                    }
                );
                app.mysql.query(
                    `UPDATE images SET titre='${response.titre}',description='${response.desc}',lien='${response.newUrl}',publicId='${response.pubId}' WHERE lien ='${response.oldUrl}'`,
                    (err, success) => { }
                );
            }
        }
    });

    app.post("/adminImageDeleted", (req, res) => {
        let response = req.body;
        app.mysql.query(
            `SELECT * from images WHERE lien ='${response.oldUrl}'`,
            (error, success) => {
                if (success) {
                    cloudinary.api.delete_resources(
                        `${success[0].publicId}`,
                        {
                            resource_type: "image",
                        },
                        (err, result) => {
                            if (result) {
                                app.mysql.query(
                                    `DELETE FROM images WHERE lien ='${response.oldUrl}'`,
                                    (error, valid) => {
                                        if (valid) {
                                            app.mysql.query(
                                                "SELECT `id`, `titre`, `description`, `lien` FROM `images`",
                                                (er, v) => {
                                                    let table = [];
                                                    v.map((elem) => {
                                                        table.push(elem);
                                                    });
                                                    res.send({ valid: table }).status(200);
                                                }
                                            );
                                        } else {
                                            res.send({ error: error }).status(400);
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });

    app.post("/adminHours", (req, res) => {
        let obj = req.body.data;
        obj.forEach((element) => {
            element.time == "lunch"
                ? app.mysql.query(
                    `UPDATE heures SET lunch = "${element.target}" WHERE day = "${element.day}"`,
                    (err, valid) => {
                        if (valid) {
                            app.mysql.query("SELECT * FROM `heures`", (error, heures) => {
                                res.send({ heures });
                            });
                        } else {
                            res.send({ error: err });
                        }
                    }
                )
                : app.mysql.query(
                    `UPDATE heures SET dinner = "${element.target}" WHERE day = "${element.day}"`,
                    (err, valid) => {
                        if (valid) {
                            app.mysql.query("SELECT * FROM `heures`", (error, heures) => {
                                res.send({ heures });
                            });
                        } else {
                            res.send({ error: err });
                        }
                    }
                );
        });
    });

    app.post("/updateCarte", (req, res) => {
        /* LA REQUETE CONCERNE PAS LES MENUS */
        req.body.formule === null
            ? app.mysql.query(
                `SELECT * from ${req.body.choiceEdit} WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
                (err, succ) => {
                    if (succ) {
                        app.mysql.query(
                            `UPDATE ${req.body.choiceEdit} SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
                            (err, valid) => {
                                if (valid) {
                                    app.mysql.query(
                                        "SELECT * FROM `entree`",
                                        (error, entree) => {
                                            error ? console.log(error) : null;
                                            app.mysql.query(
                                                "SELECT * FROM `plat`",
                                                (error, plat) => {
                                                    error ? console.log(error) : null;
                                                    app.mysql.query(
                                                        "SELECT * FROM `dessert`",
                                                        (error, dessert) => {
                                                            error ? console.log(error) : null;
                                                            app.mysql.query(
                                                                "SELECT * FROM `menu`",
                                                                (error, menu) => {
                                                                    res.send({ entree, plat, dessert, menu });
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                } else if (err) {
                                    res.send({
                                        error: "erreur lors de la mie à jour des données",
                                    });
                                }
                            }
                        );
                    }
                }
            )
            : /* LA REQUETE CONCERNE LES MENUS */
            app.mysql.query(
                `UPDATE menu SET nom = "${req.body.title}", formule = "${req.body.formule}" WHERE  nom = "${req.body.oldTitle}"`,
                (err, valid) => {
                    if (valid) {
                        app.mysql.query("SELECT * FROM `entree`", (error, entree) => {
                            error ? console.log(error) : null;
                            app.mysql.query("SELECT * FROM `plat`", (error, plat) => {
                                error ? console.log(error) : null;
                                app.mysql.query(
                                    "SELECT * FROM `dessert`",
                                    (error, dessert) => {
                                        error ? console.log(error) : null;
                                        app.mysql.query("SELECT * FROM `menu`", (error, menu) => {
                                            res.send({ entree, plat, dessert, menu });
                                        });
                                    }
                                );
                            });
                        });
                    } else if (err) {
                        res.send({
                            error: "erreur lors de la mie à jour des données",
                        });
                    }
                }
            );
    });
};
