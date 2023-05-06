export default async function dataApi(app) {
    app.post("/dataApi", (req, res) => {
        app.mysql.query("SELECT * FROM `heures`", (error, heures) => {
            error ? console.log(error) : null;
            app.mysql.query("SELECT * FROM `reserver`", (error, reservation) => {
                error ? console.log(error) : null;
                app.mysql.query(
                    "SELECT `id`, `titre`, `description`, `lien` FROM `images`",
                    (error, image) => {
                        error ? console.log(error) : null;
                        res.send({ heures, reservation, image });
                    }
                );
            });
        });
    });
}
