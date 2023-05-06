const postReservation = (
  convives,
  date,
  email,
  nom,
  heures,
  allergies,
  timeJourney
) => {
  let post = fetch("/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({
      convives: convives,
      date: date,
      email: email,
      nom: nom,
      heures: heures,
      allergies: allergies,
      timeJourney: timeJourney,
    }),
  }).then((response) => response.json());
  return post;
};

export default postReservation;
