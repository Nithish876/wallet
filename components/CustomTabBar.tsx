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
        color={focused ? "#6366F1" : "#9CA3AF"} // indigo-500 : gray-400
      />
      <Text
        className={`text-xs ${focused ? "text-indigo-500 font-medium" : "text-gray-400"}`}
      >
        {label}
      </Text>
    </View>
  );
};

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <BlurView
      intensity={60}
      tint="light"
      className="absolute bottom-4 left-4 right-4 mx-4 rounded-2xl px-4 py-3 flex-row justify-between items-center bg-white"
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const focused = state.index === index;

        const iconMap: any = {
          home: "home",
          stats: "pie-chart-outline",
          settings: "settings-outline",
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
    </BlurView>
  );
}
