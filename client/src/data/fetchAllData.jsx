export const query = () => {
  let fetching = fetch("/dataApi", {
    method: "POST",
    headers: {
      Connection: "keep-alive",
      Accept: "*",
    },
  }).then((resp) => resp.json());
  return fetching;
};
