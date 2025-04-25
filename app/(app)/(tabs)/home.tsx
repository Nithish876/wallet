import React, { useState } from "react";
import {
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  ImageSourcePropType,
  StatusBar,
  useColorScheme,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ModalScreen from "@/components/ModalScreen";
import TransactionForm from "@/components/TransactionForm";
import { auth } from "@/firebase/config";
import { IconSizes } from "@/constants/Sizes";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
//@ts-ignore
import defaultAvatar from '@/assets/images/defaultAvatar.png'
import { TouchableIcon } from "@/components/ScreenHeader";
const { width } = Dimensions.get("window");

const transactions = [
  { id: "1", title: "Groceries", amount: -120, date: "Apr 15" },
  { id: "2", title: "Salary", amount: 1500, date: "Apr 14" },
  { id: "3", title: "Electricity Bill", amount: -60, date: "Apr 13" },
];

const HomeScreen = () => {
  const [TransactionModalVisible, setTransactionModalVisible] = useState(false);
  const UserImg: any = auth.currentUser?.photoURL || "https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-e778-61f7-8a0b-396fc264c529/raw?se=2025-04-25T06%3A52%3A00Z&sp=r&sv=2024-08-04&sr=b&scid=4529ccd6-85d1-5457-aefe-6a0ba0e895dc&skoid=ae70be19-8043-4428-a990-27c58b478304&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-25T00%3A04%3A06Z&ske=2025-04-26T00%3A04%3A06Z&sks=b&skv=2024-08-04&sig=9pQ3fm4J64lIOZUZ0ZRoLHGXxs18cyBW1gcL2A4lTDs%3D";

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle={`${useColorScheme() == "dark" ? "light" : "dark"}-content`} backgroundColor={useColorScheme() == "dark" ? "black" : "white"} />
      {/* Header */}
      <ThemedView style={styles.header}>
        <Image source={{ uri: UserImg }} style={styles.avatar} />
        <View>
          <ThemedText type="title">Hi,{auth.currentUser?.displayName || "Nithish"}</ThemedText>
        </View>
        <TouchableIcon iconStyles={"ml-auto"} icon="notifications-outline" handleBackRoute={() => { console.log('hello') }} />
      </ThemedView>

      {/* Background glows */}
      <ThemedView style={[styles.glow, styles.glow1]} />
      <ThemedView style={[styles.glow, styles.glow2]} />

      {/* Balance Card */}
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardLabel}>
          Your Balance
        </ThemedText>
        <ThemedText type="title" style={styles.balanceAmount}>$1,320</ThemedText>
        <ThemedView style={styles.rowBetween}>
          <BalCardLabel amount={2000} Label="Income" icon="arrow-down-left" />
          <BalCardLabel amount={2000} isExpense Label="Expense" icon="arrow-up-right" />
        </ThemedView>
      </ThemedView>

      <CtaBtn
        icon="add-circle"
        onPress={() => setTransactionModalVisible(true)}
        title="Add Transaction"
      />

      {/* Recent Transactions */}
      <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
        Recent Transactions
      </ThemedText>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.transactionCard}>
            <ThemedText type="default">{item.title}</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{
                color: item.amount >= 0 ? "#84cc16" : "#f87171",
              }}
            >
              {item.amount >= 0 ? "+" : "-"}${Math.abs(item.amount)}
            </ThemedText>
          </ThemedView>
        )}
      />

      <ModalScreen
        isVisible={TransactionModalVisible}
        setisVisible={setTransactionModalVisible}
        containerClassNames="flex-1"
      >
        <TransactionForm />
      </ModalScreen>
    </ThemedView>
  );
};

const BalCardLabel = ({ amount, icon, Label, isExpense }: any) => {
  return (
    <ThemedView style={{ alignItems: "flex-start" }}>
      <ThemedText type="default" style={styles.labelText}>{Label}</ThemedText>
      <ThemedView
        style={[
          styles.amountBox,
          // { backgroundColor: isExpense ? "#ef4444" : "#84cc16" },
        ]}
      >
        <Feather name={icon} size={IconSizes.md} color={isExpense ? "#ef4444" : "#84cc16"} />
        <ThemedText type="defaultSemiBold" style={[styles.amountText, { color: isExpense ? "#ef4444" : "#84cc16" },]}>
          ${amount}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const CtaBtn = ({ onPress, icon, title }: any) => {
  return (
    <TouchableOpacity style={styles.ctaBtn} onPress={onPress}>
      <Ionicons name={icon} size={20} color="black" />
      <ThemedText type="defaultSemiBold" style={{ color: "black" }}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fdfdfc",  
    paddingHorizontal: 20,
    paddingTop: 40,
    position: "relative",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  glow: {
    position: "absolute",
    backgroundColor: "#84cc16",
    borderRadius: 9999,
    opacity: 0.1,
  },
  glow1: {
    width: width * 1.2,
    height: width * 0.7,
    top: -50,
    left: -80,
    transform: [{ rotate: "-15deg" }],
  },
  glow2: {
    width: width * 1.1,
    height: width * 0.6,
    top: 100,
    right: -60,
    transform: [{ rotate: "-5deg" }],
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    // backgroundColor: "#fff",
    shadowColor: "#84cc16",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: "#d4d4d4",
  },
  cardLabel: {
    marginBottom: 5,
    color: "#84cc16",
  },
  balanceAmount: {
    fontSize: 28,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 14,
    color: "#6b7280",
  },
  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 8,
  },
  amountText: {
    color: "#000",
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#84cc16",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    // color: "#111827",
  },
  transactionCard: {
    // backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
