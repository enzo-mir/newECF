const adminImageDeleted = async (oldUrl) => {
  const resp = await fetch("/adminImageDeleted", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({
      oldUrl,
    }),
  });
  return await resp.json();
};

export default adminImageDeleted;
