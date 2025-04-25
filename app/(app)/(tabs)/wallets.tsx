import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

const wallets = [
  { id: "1", name: "Personal Wallet", balance: "₹12,300" },
  { id: "2", name: "Emergency Fund", balance: "₹85,000" },
];

export default function WalletsScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const colors = {
    background: isDark ? "#0f172a" : "#f9fafb",
    text: isDark ? "#f1f5f9" : "#1f2937",
    lime: "#84cc16",
  };

  const renderWallet = ({ item }: { item: typeof wallets[0] }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={["#a3e635", "#65a30d"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <ThemedText style={[styles.walletName]}>{item.name}</ThemedText>
        <ThemedText style={styles.walletBalance}>{item.balance}</ThemedText>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <ThemedText style={[styles.title, { color: colors.text }]}>Wallets</ThemedText>

        <TouchableOpacity
          style={styles.topAddButton}
          onPress={() => console.log("Add Wallet")}
        >
          <Ionicons name="add-circle" size={30} color={colors.lime} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id}
        renderItem={renderWallet}
        contentContainerStyle={styles.walletList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  topAddButton: {
    padding: 4,
  },
  walletList: {
    paddingBottom: 32,
  },
  card: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  gradient: {
    padding: 20,
    borderRadius: 20,
  },
  walletName: {
    fontSize: 18,
    fontWeight: "600",
    // color: "#fff",
    color:'black',
    marginBottom: 8,
  },
  walletBalance: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
  },
});
