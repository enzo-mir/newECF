let cloudinary = require("cloudinary").v2

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
                `INSERT INTO images(id, titre, description, lien, publicId) VALUES (NULL,"${response.titre}","${response.desc}","${response.newUrl}","${response.pubId}")`
            );
        } else {
            if ((response.oldUrl === response.newUrl) != null) {
                app.mysql.query(
                    `UPDATE images SET titre='${response.titre}',description='${response.desc}',lien='${response.newUrl}' WHERE lien ='${response.oldUrl}'`
                );
            } else if (response.oldUrl != response.newUrl) {
                app.mysql.query(
                    `SELECT * from images WHERE lien ='${response.oldUrl}'`,
                    (error, success) => {
                        if (success) {
                            cloudinary.api.delete_resources(`${success[0].publicId}`, {
                                resource_type: "image",
                            });
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
                    cloudinary.api.delete_resources(`${success[0].publicId}`, {
                        resource_type: "image",
                    });
                    app.mysql.query(
                        `DELETE FROM images WHERE lien ='${response.oldUrl}'`
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
                    `UPDATE heures SET lunch = "${element.target}" WHERE day = "${element.day}"`
                )
                : app.mysql.query(
                    `UPDATE heures SET dinner = "${element.target}" WHERE day = "${element.day}"`
                );
        });
    });


    app.post("/updateCarte", (req, res) => {
        /* LA REQUETE CONCERNE PAS LES MENUS */
        req.body.formule === null
            ? app.mysql.query(
                `SELECT * from entree WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
                (err, succ) => {
                    if (succ) {
                        app.mysql.query(
                            `UPDATE entree SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`
                        );
                    }
                    if (succ.length < 1) {
                        app.mysql.query(
                            `SELECT * from plat WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
                            (err, succ) => {
                                if (succ) {
                                    app.mysql.query(
                                        `UPDATE plat SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`
                                    );
                                }
                                if (succ.length < 1) {
                                    app.mysql.query(
                                        `SELECT * from dessert WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
                                        (err, succ) => {
                                            if (succ) {
                                                app.mysql.query(
                                                    `UPDATE dessert SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`
                                                );
                                            }

                                            if (succ.length < 1) {
                                                //send error
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            )
            : /* LA REQUETE CONCERNE LES MENUS */
            app.mysql.query(
                `UPDATE menu SET nom = "${req.body.title}", formule = "${req.body.formule}" WHERE  nom = "${req.body.oldTitle}"`
            );
    });
}
