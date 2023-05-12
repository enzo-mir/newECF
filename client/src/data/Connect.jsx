import { useEffect } from "react";

export default function Connect({
  isConnected,
  isAdmin,
  setData,
  setReservation,
}) {
  useEffect(() => {
    fetch("/auth")
      .then((response) => response.json())
      .then((data) => {
        data.isLogged == true
          ? (data.type == "user"
              ? (isConnected(true),
                data.currentReservation
                  ? (setData(data.userdata),
                    setReservation(data.currentReservation))
                  : setData(data.userdata))
              : isConnected(false),
            data.type == "admin" ? isAdmin(true) : isAdmin(false))
          : (isConnected(false), isAdmin(false));
      });
  }, []);
}
