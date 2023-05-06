export default async function accountManagment(app) {
    app.post("/deleteAccount", (req, res) => {
        req.session.destroy();
        let response = req.body;
        app.mysql.query(
            `DELETE FROM connexion WHERE userName="${response.nom}" AND email="${response.email}"`,
            (err, success) => {
                if (success) {
                    res.send({ success: "success" }).status(200);
                } else {
                    res.send({ erreur: "Un problème est survenus lors de la suppression du profil", }).status(400);
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
    app.post("/logout", (req, res) => {
        req.session.destroy();
    });
}
