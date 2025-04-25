import {
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const RegisterScreen = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Register = async () => {
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      await register(email, password);
      router.replace("/(app)/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Register Failed", error.message);
    }

    setError("");
  };
const theme = useColorScheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, justifyContent: "center", padding: 16 }}
    >
           <StatusBar
              barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
              backgroundColor={theme === 'dark' ? '#0f172a' : '#f1f5f9'}
            />
    
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
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 24,
            textAlign: "center",
            color: "#84cc16",
          }}
        >
          Register
        </ThemedText>

        <CustomInput
          label="Email"
          value={email}
          onChangeText={(txt: any) => setEmail(txt)}
          iconName="email"
          errorMessage={error && !email ? "Email is required" : ""}
        />

        <CustomInput
          label="Password"
          value={password}
          onChangeText={(txt: any) => setPassword(txt)}
          iconName="lock"
          secureTextEntry
          errorMessage={error && !password ? "Password is required" : ""}
        />

        <TouchableOpacity
          onPress={Register}
          style={{
            backgroundColor: "#84cc16",
            paddingVertical: 12,
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          <ThemedText
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Register
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login")}
          style={{ marginTop: 16 }}
        >
          <ThemedText style={{ textAlign: "center", fontSize: 14 }}>
            Already have an account?{" "}
            <ThemedText style={{ color: "#84cc16", fontWeight: "bold" }}>
              Login
            </ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
