export default function logout() {
  return fetch("/logout", {
    method: "POST",
    headers: {
      Connection: "keep-alive",
      Accept: "*",
    },
  });
}
