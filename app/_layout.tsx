import React from 'react'
import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import "@/global.css"

export default function RootLayout(){
  const theme = useColorScheme();
  return(
    <AuthProvider>
      <ThemeProvider value={theme == 'dark'?DarkTheme:DefaultTheme}>
      <Slot />
      </ThemeProvider>
    </AuthProvider>
  )
}