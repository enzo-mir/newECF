import { useEffect } from "react";
import { connectStore, userDataStore } from "./stores/connect.store";

export default function Connect() {
  const setConnectedUser = connectStore((state) => state.setConnectedUser);
  const setUserData = userDataStore((state) => state.setUserData);
  const setCurrentReservation = userDataStore(
    (state) => state.setCurrentReservation
  );

  useEffect(() => {
    fetch("/authReservation", {
      method: "POST",
      headers: {
        Connection: "keep-alive",
        Accept: "*",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.isLogged == true) {
          if (data.type == "user") {
            setConnectedUser(true);
            if (data.currentReservation) {
              setUserData(data.userdata);
              setCurrentReservation(data.currentReservation);
            } else {
              setUserData(data.userdata);
            }
          }
        } else {
          setConnectedUser(false);
        }
      });
  }, []);
}
