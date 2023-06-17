module.exports = async function dataApi(app) {
  app.post("/dataApi", (req, res) => {
    app.mysql.query("SELECT `date` FROM `reserver` WHERE 1", (err, valid) => {
      let millisInDay = 86400000;
      valid.map((date) => {
        if (
          new Date(date.date).getTime() >
          new Date().getTime() + millisInDay
        ) {
          app.mysql.query("DELETE FROM `reserver` WHERE `date` = ?", [
            new Date(date.date).toLocaleDateString("fr-CA"),
          ]);
        }
      });
    });
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
};
