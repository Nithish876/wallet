import React from "react";
import {
  TextInput,
  useColorScheme,
  View,
  Switch,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "./ThemedText";

type InputType = "text" | "password" | "email" | "switch" | "select";

interface Option {
  label: string;
  value: string;
}

interface CustomInputProps {
  label: string;
  value: string | boolean;
  onChangeText: (text: string | boolean) => void;
  iconName: string;
  secureTextEntry?:boolean;
  type?: InputType;
  errorMessage?: string;
  options?: Option[];  
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  iconName,
  type = "text",
  secureTextEntry,
  errorMessage,
  options = [],
}) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const isSecure = type === "password" ||secureTextEntry;
  const isSwitch = type === "switch";
  const isSelect = type === "select";

  return (
    <View className="mb-4">
      <ThemedText className="text-gray-600 text-sm mb-1" type="defaultSemiBold">
        {label}
      </ThemedText>
      <View
        className={`flex-row items-center border border-gray-300 rounded-lg ${
          isSelect ? "px-1 py-0" : "p-3"
        }`}
      >
        {/*@ts-ignore */}
        <MaterialIcons name={iconName} size={20} color="gray" />

        {isSwitch ? (
          <Switch
            value={Boolean(value)}
            onValueChange={(val) => onChangeText(val)}
            trackColor={{ false: "#ccc", true: "#4ade80" }}
            thumbColor={Platform.OS === "android" ? "#4ade80" : undefined}
            style={{ marginLeft: "auto" }}
          />
        ) : isSelect ? (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            style={{
              flex: 1,
              color: isDark ? "white" : "black",
              marginLeft: 8,
            }}
            dropdownIconColor="gray"
          >
            {options.map((opt) => (
              <Picker.Item
                key={opt.value}
                label={opt.label}
                value={opt.value}
              />
            ))}
          </Picker>
        ) : (
          <TextInput
            className="flex-1 pl-2 text-lg"
            value={String(value)}
            style={{ color: isDark ? "white" : "black" }}
            onChangeText={(text) => onChangeText(text)}
            secureTextEntry={isSecure}
            placeholder={`Enter ${label}`}
            keyboardType={type === "email" ? "email-address" : "default"}
          />
        )}
      </View>
      {errorMessage && (
        <ThemedText className="text-red-500 text-xs mt-1">
          {errorMessage}
        </ThemedText>
      )}
    </View>
  );
};

export default CustomInput;
