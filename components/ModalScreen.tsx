import React, { Children, PropsWithChildren, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";

export interface ModalScreenProps extends PropsWithChildren {
  isVisible: boolean;
  className?: string;
  style?: any;
  setisVisible: (state: boolean) => void;
  containerClassNames?: string;
}

export default function ModalScreen({
  children,
  isVisible,
  className,
  setisVisible,
  style,
  containerClassNames,
}: ModalScreenProps) {
  return (
    <Modal
      style={style}
      className={className}
      visible={isVisible}
      animationType="slide"
    >
      <TouchableOpacity
        className="bg-lime-500 p-2 rounded-full self-end m-4 "
        onPress={() => {
          setisVisible(false);
        }}
      >
        <Ionicons name="close" size={22} color={"black"} />
      </TouchableOpacity>
      <ThemedView className={containerClassNames}>{children}</ThemedView>
    </Modal>
  );
}
