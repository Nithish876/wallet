import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

const AppLayout = () => {
  const theme = useColorScheme();
  return (
   <>
     <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#0f172a' : '#f1f5f9'}
      />
   <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
   </Stack>
   </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})