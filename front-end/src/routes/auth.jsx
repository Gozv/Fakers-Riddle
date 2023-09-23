import { useEffect } from "react";
import useAuth from "../store/useAuth.js";
import { redirect } from "react-router-dom";
import RoomsRoot from "./rooms-root.jsx";

function ProtectedRouteComponent() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const accessToken = useAuth((state) => state.accessToken);
  const refreshToken = useAuth((state) => state.refreshToken);
  const login = useAuth((state) => state.login);
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    const verifyAuthentication = async () => {
      const checkExpirationTime = () => {
        const accessToken = window.localStorage.getItem("token");
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const expirationTime = payload.exp;
        return console.log(expirationTime > Date.now()/1000)
      };

      const isTokenValid = checkExpirationTime();
      console.log('pase')
      console.log(isTokenValid)

      if (!isTokenValid) {
        const refreshToken = window.localStorage.getItem("refreshToken")

        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refreshToken),
        });
        console.log(response)
        const accessToken = await response.json();

        return accessToken;
      }

      isTokenValid
        ? (login(accessToken, refreshToken), redirect("/room"))
        : (logout(), redirect("/login"));
    };

    verifyAuthentication();
  }, [isAuthenticated, accessToken, refreshToken, login, logout]);

  return (
    <div>
      {isAuthenticated ? (
        <RoomsRoot />
      ) : (
        <div>Modal para confirmar ir a login</div>
      )}
    </div>
  );
}

export default ProtectedRouteComponent;
