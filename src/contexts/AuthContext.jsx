import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  async function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
