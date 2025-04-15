import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AppLayout = () => {
  return (
   <>
   <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
   </Stack>
   </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})