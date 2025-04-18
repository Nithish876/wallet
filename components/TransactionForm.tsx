import React, { useState } from "react";
import { View } from "react-native";
import CustomInput from "./CustomInput";

export default function TransactionForm() {
  const [TransactionType, setTransactionType] = useState<any>("");
  return (
    <View className="p-4 ">
      <CustomInput
        label="Transaction Type "
        value={TransactionType}
        onChangeText={(txt) => setTransactionType(txt)}
        iconName="public"
        type="select"
        options={[
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" },
          // { label: "India", value: "in" },
        ]}
      />
    </View>
  );
}
