import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//@ts-ignore
import WelcomImage from '@/assets/images/welcome.png'
import { ThemedText } from '@/components/ThemedText'
import CustomBtn from '@/components/CustomBtn'
const Welcome = () => {
  return (
    <View className='flex-1 flex-col justify-center items-center'>
        <Image
        source={WelcomImage}
        className='max-w-96 h-3/4'
        />
        <View className='shadow-slate-300 w-[90%] max-w-[450px] text-center h-1/3 p-4 rounded-lg shadow-xl justify-center flex items-center  '>
        <ThemedText type="title" className='text-center my-2'>Always Track Your Transactions!</ThemedText>
        <ThemedText type="default" className='my-4 text-center'>Your smart, simple, and secure way to manage money.</ThemedText>
        <CustomBtn title='Get started' className='mx-auto' onPress={()=>{console.log("Welcome To Wallet")}}/>
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})