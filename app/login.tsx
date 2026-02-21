import React, { useState } from "react";

import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginRequest } from "@/src/api/auth.api";
import { useAuthStore } from '@/src/store/authStore'

export default function LoginScreen() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const setAuth = useAuthStore((state) => state.setAuth)

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Validation Error", "Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      const response = await loginRequest(user, password);

      setAuth(
        response.data.user,
        response.data.token,
        response.data.hasOnboarded ?? false
      );

      router.replace("/(tabs)/Home");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      const message =
        err.response?.data?.detail || "Invalid username or password";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inner}
      >
        <Text style={styles.logo}>DatingApp 💘</Text>
        <Text style={styles.subtitle}>Find your perfect match</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          value={user}
          onChangeText={setUser}
          style={styles.input}
          autoCapitalize="none"
        />

        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 15, top: 15 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={{ color: "#FF4D6D", fontWeight: "bold" }}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/signup-email")}>
          <Text style={styles.signupText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { flex: 1, justifyContent: "center", paddingHorizontal: 25 },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF4D6D",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: "#777", textAlign: "center", marginBottom: 40 },
  input: {
    height: 55,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 55,
    backgroundColor: "#FF4D6D",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  signupText: { textAlign: "center", marginTop: 20, color: "#555" },
});
