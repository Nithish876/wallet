import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomInput from "./CustomInput";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";


export default function TransactionForm() {
  const [TransactionType, setTransactionType] = useState<string>("");
  const [Title, setTitle] = useState<string>("");
  const [Amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    if (!TransactionType || !Title || !Amount) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    console.log({ TransactionType, Title, Amount });
    Alert.alert("Saved", "Transaction added successfully!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ThemedView
        style={{ 
          padding: 20,
          borderRadius: 16,
          // backgroundColor: "#1e1e1e",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <ThemedText
          type="title"
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#84cc16",
            marginBottom: 16,
          }}
        >
          Add New Transaction
        </ThemedText>

        <CustomInput
          label="Transaction Type"
          value={TransactionType}
          onChangeText={(txt:any) => setTransactionType(txt)}
          iconName="swap-horizontal"
          type="select"
          options={[
            { label: "Income", value: "income" },
            { label: "Expense", value: "expense" },
          ]}
        />

        <ThemedView style={{ marginTop: 16 }}>
          <ThemedText style={{ fontSize: 14, color: "#a3e635", marginBottom: 4 }}>
            Title
          </ThemedText>
          <TextInput
            value={Title}
            onChangeText={setTitle}
            placeholder="Eg: Groceries"
            placeholderTextColor="#94a3b8"
            style={{
              backgroundColor: "#1f2937",
              color: "white",
              padding: 12,
              borderRadius: 10,
              fontSize: 16,
            }}
          />
        </ThemedView>

        <ThemedView style={{ marginTop: 16 }}>
          <ThemedText style={{ fontSize: 14, color: "#a3e635", marginBottom: 4 }}>
            Amount
          </ThemedText>
          <TextInput
            value={Amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Eg: 120"
            placeholderTextColor="#94a3b8"
            style={{
              backgroundColor: "#1f2937",
              color: "white",
              padding: 12,
              borderRadius: 10,
              fontSize: 16,
            }}
          />
        </ThemedView>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#84cc16",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 12,
            marginTop: 24,
          }}
        >
          <ThemedText
            type="default"
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "#000" }}
          >
            Save Transaction
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
