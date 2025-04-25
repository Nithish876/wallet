import React from "react";
import { View, Pressable, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TabIcon = ({
  name,
  label,
  focused,
}: {
  name: string;
  label: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center">
      <Ionicons
        name={name as any}
        size={24}
        color={focused ? "#84cc16" : "black"}  
      />
      <Text
        className={`text-xs ${focused ? "text-lime-500" : "black"}`}
      >
        {label}
      </Text>
    </View>
  );
};

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View  
      className="absolute bottom-4 left-4 right-4 mx-4 rounded-2xl px-4 py-3 flex-row justify-between items-center bg-white"
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const focused = state.index === index;

        const iconMap: any = {
          home: "home-outline",
          stats: "pie-chart-outline",
          settings: "settings-outline",
          wallets: "wallet-outline",
        };

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className="flex-1 items-center"
          >
            <TabIcon
              name={iconMap[route.name]}
              label={label}
              focused={focused}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
