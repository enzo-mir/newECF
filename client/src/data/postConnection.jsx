export const postConnection = (email, mdp) => {
  let postAccount = fetch("/authLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      mdp: mdp,
    }),
  }).then((res) => res.json());

  return postAccount;
};
