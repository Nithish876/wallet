// import React,{ createContext, ReactNode, useContext, useEffect, useState } from "react";
// import {User,createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
// import { auth } from "@/firebase/config";

// interface AuthContextProps {
//     user:User|null;
//     loading:boolean;
//     login: (email: string, password: string) => Promise<void>;
//     signup: (email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;

// }

// const AuthContext = createContext<AuthContextProps>({
//     user:null,
//     loading:true,
//     login:async()=>{},
//     signup:async()=>{},
//     logout:async()=>{}
// });

// interface AuthProviderProps{
//     children:ReactNode;
// }

// export const AuthProvider = ({children}:AuthProviderProps)=>{
//     const [user,setUser] = useState<User|null>(null);
//     const [loading,setloading]= useState(true);

//     useEffect(()=>{
//         const unsub = onAuthStateChanged(auth,(user)=>{
//             setUser(user ?? null);
//             setloading(false);
//         })
//         return unsub;
//     },[]);
//    const login = async (email:string,password:string)=>{
//     await signInWithEmailAndPassword(auth,email,password);
//    }
//     const signup = async (email:string,password:string)=>{
//         await createUserWithEmailAndPassword(auth,email,password)
//     }
//     const logout = async()=>{
//         await signOut(auth);
//     }
//     return(
//         <AuthContext.Provider value={{user,loading,signup,login,logout}}>
//         {children}
//         </AuthContext.Provider>

//     );
// }

// export const useAuth = ()=>useContext(AuthContext);
// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, AuthContextType } from "@/types/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from AsyncStorage and set it in state
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    fetchUser();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser); // Debug log
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);

            // Save user data to AsyncStorage
            await AsyncStorage.setItem("user", JSON.stringify(userData));
          } else {
            console.log("No user document found"); // Debug log
          }
        } catch (error) {
          console.error("Error fetching user doc:", error);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem("user"); // Remove user from AsyncStorage on logout
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("User registered:", userCredential.user); // Debug log

      const userData: User = {
        id: userCredential.user.uid,
        email: email,
        name: email.split("@")[0],
        friendCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        friends: [],
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      console.log("User document created"); // Debug log
      setUser(userData);

      // Persist user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      setUser(userData);

      // Persist user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    await AsyncStorage.removeItem("user"); // Clear user from AsyncStorage
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
