import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post("/login", { email, password });
      console.log("Resposta da API:", response.data); // <-- Adicione este log
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data); // Certifique-se de que só o "user" está sendo definido
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
      }
    } catch (error) {
      console.log("Erro no login:", error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};