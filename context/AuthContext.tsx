import React,{ createContext, ReactNode, useContext, useEffect, useState } from "react";
import {User,createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from "@/firebase/config";

interface AuthContextProps {
    user:User|null;
    loading:boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

}

const AuthContext = createContext<AuthContextProps>({
    user:null,
    loading:true,
    login:async()=>{},
    signup:async()=>{},
    logout:async()=>{}
});

interface AuthProviderProps{
    children:ReactNode;
}

export const AuthProvider = ({children}:AuthProviderProps)=>{
    const [user,setUser] = useState<User|null>(null);
    const [loading,setloading]= useState(true);
    
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setUser(user ?? null);
            setloading(false);
        })
        return unsub;
    },[]);
   const login = async (email:string,password:string)=>{
    await signInWithEmailAndPassword(auth,email,password);
   }
    const signup = async (email:string,password:string)=>{
        await createUserWithEmailAndPassword(auth,email,password)
    }
    const logout = async()=>{
        await signOut(auth);
    }
    return( 
        <AuthContext.Provider value={{user,loading,signup,login,logout}}>
        {children}
        </AuthContext.Provider>

    );
}

export const useAuth = ()=>useContext(AuthContext);