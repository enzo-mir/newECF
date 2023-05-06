const adminImageDeleted = async (oldUrl) => {
  let postDataImage = fetch("/adminImageDeleted", {
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
  return postDataImage;
};

export default adminImageDeleted;
