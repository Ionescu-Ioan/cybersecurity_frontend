import { createContext, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import * as jose from "jose";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const CheckExpiredToken = () => {
    if (!user || !user.data || !user.data.token) return;

    const payload = jose.decodeJwt(user.data.token);

    if (
      Math.floor(Date.now() / 1000) >
      parseInt(payload.created_at, 10) + parseInt(payload.expires_in, 10)
    ) {
      console.log("You will be logged out! The token has expired!");
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(CheckExpiredToken, 2000); // Check every 2 seconds, adjust as needed
    return () => clearInterval(interval);
  }, [user]); // Run effect whenever user changes

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      CheckExpiredToken,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
