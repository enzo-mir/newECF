export default async function postUpdateCard(
  oldTitle,
  oldDesc,
  title,
  desc,
  price,
  formule,
  choiceEdit
) {
  const resp = await fetch("/updateCarte", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      oldTitle,
      oldDesc,
      title,
      desc,
      price,
      formule: formule ? formule : null,
      choiceEdit,
    }),
  });
  return await resp.json();
}
