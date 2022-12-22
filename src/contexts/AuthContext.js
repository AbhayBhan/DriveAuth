import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebasecfg';
import {onAuthStateChanged, createUserWithEmailAndPassword,signOut, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signin = (email,password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signout = () => {
    return signOut(auth);
  }

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (User) => {
      setCurrentUser(User);
      setLoading(false);
    })
    return unsubscribe;
  },[])

  const val = {
    currentUser,
    signin,
    login,
    signout,
    resetPass
  }

  return (
    <AuthContext.Provider value={val}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider