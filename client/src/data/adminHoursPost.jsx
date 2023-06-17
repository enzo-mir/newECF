export default async function adminHoursPost(dataHours) {
  return fetch("/adminHours", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      data: dataHours,
    }),
  }).then((resp) => resp.json());
}
