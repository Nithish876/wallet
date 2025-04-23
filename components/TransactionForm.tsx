import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import CustomInput from "./CustomInput";

export default function TransactionForm() {
  const [TransactionType, setTransactionType] = useState<string>("");
  const [Title, setTitle] = useState<string>("");
  const [Amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    if (!TransactionType || !Title || !Amount) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    // Save logic here
    console.log({ TransactionType, Title, Amount });
    Alert.alert("Saved", "Transaction added successfully!");
  };

  return (
    <View className="p-4 bg-black rounded-2xl">
      <Text className="text-lg text-lime-500 font-bold mb-4">
        Add New Transaction
      </Text>

      <CustomInput
        label="Transaction Type"
        value={TransactionType}
        onChangeText={(txt) => setTransactionType(txt)}
        iconName="swap-horizontal"
        type="select"
        options={[
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" },
        ]}
      />

      <View className="mt-4">
        <Text className="text-sm text-lime-400 mb-1">Title</Text>
        <TextInput
          value={Title}
          onChangeText={setTitle}
          placeholder="Eg: Groceries"
          placeholderTextColor="#94a3b8"
          className="bg-slate-800 text-white p-3 rounded-lg"
        />
      </View>

      <View className="mt-4">
        <Text className="text-sm text-lime-400 mb-1">Amount</Text>
        <TextInput
          value={Amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Eg: 120"
          placeholderTextColor="#94a3b8"
          className="bg-slate-800 text-white p-3 rounded-lg"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-lime-500 py-3 px-5 mt-6 rounded-xl"
      >
        <Text className="text-black text-center font-bold text-base">
          Save Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
}
