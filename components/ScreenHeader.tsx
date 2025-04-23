import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { IconSizes } from "@/constants/Sizes";
import {
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Route } from "expo-router/build/Route";
import { router } from "expo-router";
import { ThemedText } from "./ThemedText";
import iconSet from "@expo/vector-icons/build/FontAwesome6";

export interface ScreenHeaderProps {
  backRoute?: string;
  rightIcon?: string;
  ScreenName?: string;
}

export const TouchableIcon = ({ handleBackRoute, icon, iconStyles }: any) => {
  return (
    <TouchableOpacity
      onPress={handleBackRoute}
      className={`flex justify-center items-center bg-lime-500 w-[40] h-[40] rounded-xl mx-2 ${iconStyles}`}
    >
      <Ionicons name={icon} size={24} />
    </TouchableOpacity>
  );
};

export default function ScreenHeader(props: ScreenHeaderProps) {
  const handleBackRoute = () => {
    if (router.canGoBack()) {
      router.back();
    }
    router.replace(props.backRoute);
  };
  return (
    <View className="w-full h-16 flex flex-row justify-between items-center p-2">
      <TouchableIcon
        icon="arrow-back-outline"
        handleBackRoute={handleBackRoute}
      />
      <ThemedText className="font-bold text-lg text-center flex-1">
        {props.ScreenName}
      </ThemedText>
      {props.rightIcon ? (
        <TouchableIcon icon={props.rightIcon} />
      ) : (
        <View style={{ width: 40, height: 40, marginHorizontal: 8 }} />
      )}
    </View>
  );
}
