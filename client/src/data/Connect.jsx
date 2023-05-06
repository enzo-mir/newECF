import { useEffect } from "react";

export default function Connect({ isConnected, isAdmin, setData }) {
  useEffect(() => {
    fetch("/auth")
      .then((response) => response.json())
      .then((data) => {
        data.isLogged == true
          ? (data.type == "user"
              ? (isConnected(true), setData(data.userdata))
              : isConnected(false),
            data.type == "admin" ? isAdmin(true) : isAdmin(false))
          : (isConnected(false), isAdmin(false));
      });
  }, []);
}
