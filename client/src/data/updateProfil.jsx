export default async function updateProfil(
  nom,
  email,
  mdp,
  convives,
  alergies,
  oldEmail,
  oldPassword
) {
  let postUpdateAccount = fetch("/updateProfil", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      nom: nom,
      email: email,
      mdp: mdp,
      convives: convives,
      alergies: alergies,
      oldEmail: oldEmail,
      oldPassword: oldPassword,
    }),
  }).then((res) => res.json());

  return postUpdateAccount;
}
