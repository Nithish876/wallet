import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


export type CustomBtnProps = {
    title: string,
    onPress: () => void,
    className:string
}

const CustomBtn = (props: CustomBtnProps) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
         style={{
            cursor:"pointer"
         }}
        >
            <View className={`bg-lime-400 p-4 rounded-xl shadow-sm shadow-zinc-900 ${props.className}`} >
            <Text className=''>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomBtn

const styles = StyleSheet.create({})