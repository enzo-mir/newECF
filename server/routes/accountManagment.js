module.exports = async function accountManagment(app) {
    app.post("/deleteAccount", (req, res) => {
        req.session.destroy();
        let response = req.body;
        app.mysql.query(
            `DELETE FROM connexion WHERE userName="${response.nom}" AND email="${response.email}"`,
            (err, success) => {
                if (success) {
                    res.send({ success: "success" }).status(200);
                } else {
                    res
                        .send({
                            erreur:
                                "Un problème est survenus lors de la suppression du profil",
                        })
                        .status(400);
                }
            }
        );
    });
    app.post("/createAccount", (request, res) => {
        let nom = request.body.nom;
        let email = request.body.email;
        let mdp = request.body.mdp;
        let convives = request.body.convives;
        let alergies = request.body.alergies;
        app.mysql.query(
            `SELECT * FROM connexion WHERE email = "${email}"`,
            (error, result) => {
                if (result.length < 1) {
                    app.mysql.query(
                        `INSERT INTO connexion(id, userName, email, password, convive, alergie) VALUES (NULL,'${nom}','${email}','${mdp}','${convives}','${alergies !== undefined ? alergies : "aucune"
                        }')`,
                        (err, success) => {
                            if (success) {
                                res.send({ acces: true });
                            }
                            res.send({ acces: false });
                        }
                    );
                } else {
                    res.send({ error: "e-mail déjà pris" });
                }
            }
        );
    });

    app.post("/updateProfil", (req, res) => {
        let name = req.body.nom;
        let email = req.body.email;
        let guests = req.body.convives;
        let alergy = req.body.alergies;
        let pwd = req.body.mdp;
        let oldpwd = req.body.oldPassword;
        let oldEmail = req.body.oldEmail;

        app.mysql.query(
            "UPDATE `connexion` SET `userName` = ?,`email` = ?,`password` = ?,`convive` = ?,`alergie` = ? WHERE email = ? AND password = ?",
            [name, email, pwd, guests, alergy, oldEmail, oldpwd],
            (error, success) => {
                if (success) {
                    app.mysql.query(
                        "SELECT * from `connexion` WHERE `email` = ? AND `password` = ?",
                        [email, pwd],
                        (err, valid) => {
                            if (valid.length) {
                                req.session.user = valid;
                                res.send({ valid: "Profil mis à jour" });
                            } else {
                                res.send({ error: "erreur lors de la mise à jour du profil" });
                            }
                        }
                    );
                } else {
                    res.send({ error: "erreur lors de la mise à jour du profil" });
                }
            }
        );
    });
    app.post("/logout", (req, res) => {
        res.send(req.session.destroy());
    });
};
