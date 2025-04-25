import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  const theme = useColorScheme();
  return (
    <>
         <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={theme === 'dark' ? '#0f172a' : '#f1f5f9'}
          />
      <Stack screenOptions={{ headerShown: false }}> 
      </Stack>
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})