import React, { createContext, useContext, useState, useEffect } from 'react'
import {auth} from '../firebase-cfg';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut , sendPasswordResetEmail, updatePassword } from 'firebase/auth'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const updatePass = (password) => {
        const user = auth.currentUser;
        return updatePassword(user, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    },[])

    const val = {
        currentUser,
        signUp,
        login,
        logout,
        resetPass,
        updatePass
    }
  return (
    <AuthContext.Provider value={val}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
