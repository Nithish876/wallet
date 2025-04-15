import React from 'react';
import { TextInput, useColorScheme, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Use any icon package
import { ThemedText } from './ThemedText';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  iconName,
  secureTextEntry = false,
  errorMessage,
}) => {
    const theme = useColorScheme();
  return (
    <View className={'mb-4'}>
      <ThemedText className={'text-gray-600 text-sm'}>{label}</ThemedText>
      <View
        className={'flex-row items-center border border-gray-300 rounded-lg p-3'}
      >
        {/*@ts-ignore */}
        <MaterialIcons name={iconName} size={20} color="gray" />
        <TextInput
          className={'flex-1 pl-2 text-sm'}
          value={value}
          style={{color:theme=="dark"?"white":''}}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={`Enter ${label}`}
        />
      </View>
      {errorMessage && <ThemedText className={'text-red-500 text-xs'}>{errorMessage}</ThemedText>}
    </View>
  );
};

export default CustomInput;
