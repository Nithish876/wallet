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
  login: async ()=>{},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

 
            await AsyncStorage.setItem("user", JSON.stringify(userData));
          } else {
            console.log("No user document found");  
          }
        } catch (error) {
          console.error("Error fetching user doc:", error);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem("user");  
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
      console.log("User registered:", userCredential.user);  

      const userData: User = {
        id: userCredential.user.uid,
        email: email,
        name: email.split("@")[0],
        friendCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        friends: [],
      };

      try {
        await setDoc(doc(db, "users", userCredential.user.uid), userData);
        console.log("User document created in Firestore");
      } catch (error) {
        console.error("Error creating user document in Firestore:", error);
      }
      
      setUser(userData);

    
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
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
    await AsyncStorage.removeItem("user");  
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
