import { View, Text, Image, ImageProps } from 'react-native'
import React from 'react'

export interface AvatarProps {
    src: ImageProps;
    className: string;
    style: string;
    imgClassName: string;
}
const Avatar = ({ src, style, className, imgClassName }: AvatarProps) => {
    return (
        <View style={style} className={`${className} w-10 h-10 rounded-full bg-orange-500 border border-orange-800 `}>
            <Image
                className={imgClassName}
                source={src}
                style={{ width: 50, height: 50, borderRadius: 500 }}
            />
        </View>
    )
}

export default Avatar