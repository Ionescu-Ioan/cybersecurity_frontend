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

  const login = async (data) => {
    setUser(data);
    navigate("/");
  };

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
      navigate("/session_expired", { replace: true });
    }
  };

  useEffect(() => {
    CheckExpiredToken();
  }, [user]);

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
