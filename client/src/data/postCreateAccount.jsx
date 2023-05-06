export default async function postCreateAccount(
  nom,
  email,
  mdp,
  convives,
  alergies
) {
  let postAccount = fetch("/createAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      nom,
      email,
      mdp,
      convives,
      alergies,
    }),
  }).then((res) => res.json());

  return postAccount;
}
