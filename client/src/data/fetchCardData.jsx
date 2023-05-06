export const cardQuery = async () => {
  let fetching = fetch("/cardApi", {
    method: "POST",
    headers: {
      Connection: "keep-alive",
      Accept: "*",
    },
  }).then(async (resp) => await resp.json());
  return await fetching;
};
