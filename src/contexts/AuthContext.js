import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    Title: "No Song Selected",
    Lyrics: "Please select a song from the Index page",
    Number: "",
  });

  function signUp(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    setCurrentSong,
    currentSong,
    history,
    setHistory,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
