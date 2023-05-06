export default function deleteAccount(name, email) {
  let deleteAcc = fetch("/deleteAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({
      nom: name,
      email: email,
    }),
  });

  return deleteAcc;
}
