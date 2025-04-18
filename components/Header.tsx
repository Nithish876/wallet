import { View, Text } from 'react-native'
import React from 'react' 
import { ThemedText } from './ThemedText'
import Avatar from './Avatar'
import { auth } from '@/firebase/config'

interface HeaderProps {
    containerClass: string;
}

const HeaderComponent = (props: HeaderProps) => {
    console.log("THis is profile pic ; ",auth.currentUser?.photoURL);
    const placeHolderImg = 'https://media.licdn.com/dms/image/v2/D5603AQGLWXGkDyZfJQ/profile-displayphoto-shrink_100_100/B56ZZEVjqxGcAY-/0/1744903224512?e=1750291200&v=beta&t=0beerseLVv11GGyNEKzAXWMvDJun8aI1GIA5rifYGBM';
    return (
        <View className={`${props.containerClass}`}>
            {/* Greetings */}
            <Avatar
                src={auth.currentUser?.photoURL || placeHolderImg}
                className=''
            />
            <View>
                <ThemedText>Hi , {auth.currentUser?.displayName}</ThemedText>
            </View>
        </View>
    )
}

export default HeaderComponent;