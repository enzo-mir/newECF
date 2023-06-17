export const deleteReservation = async (guests, date, hours, email) => {
  return fetch("/deleteReservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({
      guests,
      date,
      hours,
      email,
    }),
  }).then((r) => r.json());
};
