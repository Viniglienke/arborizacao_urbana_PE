import { createContext, useState, useEffect } from "react";
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
        const parsedUser = JSON.parse(storageUser);
        setUser(parsedUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post("/login", { email, password });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data.user);  // Armazenando apenas os dados do usuário
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
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