import { createContext, useContext, useState, useEffect } from "react";
import parseJwt from "../services/parseJwt";
import { refreshAccessToken } from "../services/authService";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => setUser(userData);
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  useEffect(() => {
    const func = async ()=>{
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const decoded = parseJwt(accessToken);
  
        if (decoded && decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          // accessToken протух — спроба оновити
          await refreshAccessToken()
            .then((data) => {
              const newDecoded = parseJwt(data.accessToken);
              setUser(newDecoded);
            })
            .catch(() => {
              logout();
            });
        }
      }
    };
    func();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
