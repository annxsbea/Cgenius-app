import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, database } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { SignInScreenProp, UserDetails } from "../@types";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { scheduleNotification } from "../lib/notification";

interface AuthContextProps {
  user: UserDetails | null;
  signIn: (email: string, password: string) => Promise<UserDetails | null>;
  createAccount: (
    email: string,
    password: string,
    name: string,
    cpf: string,
    setor: string,
    profilePictureUrl?: string
  ) => Promise<User>;
  signOut: () => Promise<void>;
  updateProfilePicture: (newPictureUrl: string) => Promise<void>; 

}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigation = useNavigation<SignInScreenProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(collection(database, "usuarios"), currentUser.uid));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), uid: currentUser.uid } as UserDetails);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);





  const signIn = async (email: string, password: string): Promise<UserDetails | null> => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const userDoc = await getDoc(doc(collection(database, "usuarios"), user.uid));
      if (userDoc.exists()) {
        const userDetails = { ...userDoc.data(), uid: user.uid } as UserDetails;
        setUser(userDetails);

        await scheduleNotification("Bem-vindo(a)! ao Cgenius", "A Solução para otimizar o desempenho das equipes de vendas!");

        return userDetails;
      } else {
        throw new Error("Dados do usuário não encontrados no Firestore.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Verifique suas credenciais.");
      return null;
    } finally {
      setLoading(false);
    }
  };


  const createAccount = async (
    email: string,
    password: string,
    name: string,
    cpf: string,
    setor: string,
    profilePictureUrl?: string 
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(database, "usuarios", user.uid), {
        email,
        name,
        cpf,
        setor,
        perfil: null,
        profilePictureUrl: profilePictureUrl || null, 
      });
      await scheduleNotification("Bem-vindo(a)! ao Cgenius", "A Solução para otimizar o desempenho das equipes de vendas!");
      return user;
    } catch (error) {

      console.error("Erro ao criar conta:", error);
      throw error;
    }
  };
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const updateProfilePicture = async (newPictureUrl: string) => {
    if (!isValidUrl(newPictureUrl)) {
      throw new Error("Invalid profile picture URL format");
    }
  
    if (user) {
      setLoading(true);
      try {
        const updatedUser = { ...user, profilePictureUrl: newPictureUrl };
        setUser(updatedUser);
  
        await setDoc(doc(database, "usuarios", user.uid), updatedUser, { merge: true });
      } catch (error) {
        console.error("Erro ao atualizar a imagem de perfil:", error);
        setError("Failed to update profile picture");
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Usuário não autenticado");
      throw new Error("User not authenticated");
    }
  };
  
  
  
  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setUser(null);
      navigation.navigate("SignIn");
    } catch (error) {
      setError("Erro ao sair. Tente novamente.");
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, createAccount, signOut, updateProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
