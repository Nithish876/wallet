import React, { PropsWithChildren } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";

export interface ModalScreenProps extends PropsWithChildren {
  isVisible: boolean;
  setisVisible: (state: boolean) => void;
  style?: any;
  containerClassNames?: string;
  disableCloseButton?: boolean;
}

export default function ModalScreen({
  children,
  isVisible,
  setisVisible,
  style,
  containerClassNames = "",
  disableCloseButton = false,
}: ModalScreenProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setisVisible(false)}
    >
      <ThemedView className="flex-1 bg-black/80 justify-end">
        <SafeAreaView className={`rounded-t-3xl p-5 ${containerClassNames}`} style={style}>
          {/* Close Button */}
          {!disableCloseButton && (
            <TouchableOpacity
              onPress={() => setisVisible(false)}
              className="absolute top-4 right-4 bg-lime-500 p-2 rounded-full z-10"
            >
              <Ionicons name="close" size={22} color="black" />
            </TouchableOpacity>
          )}

          {/* Scrollable Content */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            className="mt-8"
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </Modal>
  );
}
