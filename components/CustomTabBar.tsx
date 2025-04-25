import React from "react";
import { View, Pressable, Text, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

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
        color={focused ? "#84cc16" : useColorScheme()=="dark"?"white":"black"}  
      />
      <ThemedText
      style={[{fontSize:12},focused?{color:'#84cc16'}:{color:useColorScheme()=="dark"?"white":'black'}]}
        className={`text-xs ${focused ? "text-lime-500" : "black"}`}
      >
        {label}
      </ThemedText>
    </View>
  );
};

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <ThemedView  
    style={useColorScheme()=="dark"?{shadowColor:"#84cc16",shadowOffset:{width:10,height:10},shadowOpacity:.4,shadowRadius:8}:{}}
      className="absolute bottom-4 left-4 right-4 mx-4 rounded-2xl px-4 py-3 flex-row justify-between items-center "
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
    </ThemedView>
  );
}
