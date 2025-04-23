import React, { PropsWithChildren } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";

export interface ModalScreenProps extends PropsWithChildren {
  isVisible: boolean;
  setisVisible: (state: boolean) => void;
  style?: any;
  containerClassNames?: string;
}

export default function ModalScreen({
  children,
  isVisible,
  setisVisible,
  style,
  containerClassNames,
}: ModalScreenProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setisVisible(false)}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <View
          className={`rounded-t-3xl bg-black p-5 ${containerClassNames}`}
          style={style}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setisVisible(false)}
            className="absolute top-4 right-4 bg-lime-500 p-2 rounded-full z-10"
          >
            <Ionicons name="close" size={22} color="black" />
          </TouchableOpacity>

          {/* Children Content */}
          <View className="mt-8">{children}</View>
        </View>
      </View>
    </Modal>
  );
}
