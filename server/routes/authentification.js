module.exports = async function authentification(app) {
    app.post("/authLogin", (req, res) => {
        app.mysql.query(
            `SELECT * FROM connexion WHERE email = "${req.body.email}" AND password = "${req.body.mdp}"`,
            (error, success) => {
                if (success.length < 1) {
                    res.send({ erreur: "adresse e-mail ou mot de passe incorrect" });
                } else {
                    if (
                        success[0].email == "admin@admin.com" &&
                        success[0].password == "admin"
                    ) {
                        req.session.admin = success;
                        res.send({ access: "admin" });
                    } else {
                        req.session.user = success;
                        res.send({ access: "user" });
                    }
                }
            }
        );
    });
    app.get("/auth", (req, res) => {
        if (req.session.user) {
            let data = req.session.user[0];
            res.send({ isLogged: true, type: "user", userdata: data });
        }
        if (req.session.admin) {
            res.send({ isLogged: true, type: "admin", userdata: null });
        }
    });
}
