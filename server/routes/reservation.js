export default async function reservation(app) {
    app.post("/reservation", (req, res) => {
        let response = req.body;
        let convives = parseInt(response.convives);
        let guestsLimit = 35;
        let tableGuests = [];

        if (response.timeJourney == "lunch") {
            app.mysql.query(
                `SELECT convive FROM reserver WHERE date="${response.date}" AND moment="${response.timeJourney}"`,
                (err, succ) => {
                    succ.map((guests) => {
                        tableGuests.push(guests.convive);
                    });

                    let maxGuests = eval(tableGuests.join("+"));
                    if (maxGuests + convives > guestsLimit) {
                        res.send({
                            error:
                                "nombre de Convive maximum atteint, veuillez choisir une autre plage d'horaire",
                        });
                    } else {
                        res.send({ valid: "" });
                        app.mysql.query(
                            `INSERT INTO reserver (id, convive, date,moment, heures, nom, email, alergie) VALUES (null,${response.convives},"${response.date}","${response.timeJourney}","${response.heures}","${response.nom}","${response.email}","${response.allergies}")`
                        );
                    }
                }
            );
        }
        if (response.timeJourney == "diner") {
            app.mysql.query(
                `SELECT convive FROM reserver WHERE date="${response.date}" AND moment="${response.timeJourney}"`,
                (err, succ) => {
                    if (err) console.log(err);
                    succ.map((guests) => {
                        tableGuests.push(guests.convive);
                    });

                    let maxGuests = eval(tableGuests.join("+"));

                    if (maxGuests + convives > guestsLimit) {
                        res.send({
                            error:
                                "nombre de Convive maximum atteint, veuillez choisir une autre plage d'horaire",
                        });
                    } else {
                        res.send({ valid: "" });
                        app.mysql.query(
                            `INSERT INTO reserver (id, convive, date, moment, heures, nom, email, alergie) VALUES (null,${response.convives},"${response.date}","${response.timeJourney}","${response.heures}","${response.nom}","${response.email}","${response.allergies}")`
                        );
                    }
                }
            );
        }
    });
}
