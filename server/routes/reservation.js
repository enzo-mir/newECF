module.exports = async function reservation(app) {


    app.post("/reservation", (req, res) => {
        let response = req.body;
        let convives = parseInt(response.convives);
        let guestsLimit = 35;
        let tableGuests = [];
        app.mysql.query(
            "SELECT convive FROM reserver WHERE date= ? AND moment = ? AND email = ?",
            [response.date, response.timeJourney, response.email],
            (err, valid) => {
                if (valid.length) {
                    res.send({
                        error:
                            "vous ne pouvez pas réserver le même jour aux mêmes plages horaires",
                    });
                } else if (!valid.length || err) {
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
                                app.mysql.query(
                                    `INSERT INTO reserver (id, convive, date,moment, heures, nom, email, alergie) VALUES (null,${response.convives},"${response.date}","${response.timeJourney}","${response.heures}","${response.nom}","${response.email}","${response.allergies}")`,
                                    (err, success) => {
                                        if (success && req.session.user) {
                                            app.mysql.query(
                                                "SELECT `convive`,`date`,`heures`,`email` FROM `reserver` WHERE email = ?",
                                                [req.session.user[0].email],
                                                (error, valid) => {
                                                    if (valid.length) {
                                                        let tableReserv = [];
                                                        valid.map((elem) => tableReserv.push(elem));

                                                        res.send({ valid: tableReserv });
                                                    } else {
                                                        res.send({ error: "echec de l'accé aux données" });
                                                    }
                                                }
                                            );
                                        } else if (success && !req.session.user) {
                                            res.send({ valid: "réservation validée !" });
                                        } else if (err) {
                                            res.send({ error: "echec de la réservation" });
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

    app.post("/deleteReservation", (req, res) => {
        let response = req.body;

        app.mysql.query(
            "DELETE FROM `reserver` WHERE `convive` = ? AND `date` = ? AND `heures` = ? AND `email` = ?",
            [response.guests, response.date, response.hours, response.email],
            (err, valid) => {
                if (err) {
                    res.send({ error: "echec de la supression" });
                } else {
                    app.mysql.query(
                        "SELECT `convive`,`date`,`heures`,`email` FROM `reserver` WHERE email = ?",
                        response.email,
                        (error, success) => {
                            if (success.length) {
                                let tableReserv = [];
                                success.map((elem) => tableReserv.push(elem));
                                res.send({ valid: tableReserv });
                            } else if (error || !success) {
                                res.send({ error: "echec de la supression" });
                            } else if (success) {
                                res.send({ valid: [] });
                            }
                        }
                    );
                }
            }
        );
    });
};
