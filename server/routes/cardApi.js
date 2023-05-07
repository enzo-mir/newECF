module.exports = async function cardApi(app) {
    app.post("/cardApi", (req, res) => {
        app.mysql.query("SELECT * FROM `entree`", (error, entree) => {
            error ? console.log(error) : null;
            app.mysql.query("SELECT * FROM `plat`", (error, plat) => {
                error ? console.log(error) : null;
                app.mysql.query("SELECT * FROM `dessert`", (error, dessert) => {
                    error ? console.log(error) : null;
                    app.mysql.query("SELECT * FROM `menu`", (error, menu) => {
                        error ? console.log(error) : null;
                        res.send({ entree, plat, dessert, menu });
                    });
                });
            });
        });
    });
}
