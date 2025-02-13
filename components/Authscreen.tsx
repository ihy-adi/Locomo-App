import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (type === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.replace("/home");
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type === "login" ? "Welcome Back!" : "Create an Account"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

<TouchableOpacity
  style={[styles.button, loading && styles.disabledButton]}
  onPress={handleAuth}
  disabled={loading}
>
  {loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Text style={styles.buttonText}>{type === "login" ? "Log In" : "Sign Up"}</Text>
  )}
</TouchableOpacity> {/* ✅ Properly closed this TouchableOpacity */}

<TouchableOpacity 
  onPress={() => router.push(type === "login" ? "/auth/signup" : "/auth/login")} 
  style={styles.linkContainer}
>
  <Text style={styles.linkText}>
    {type === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 12,
  },
  linkText: {
    color: "#007bff",
  },
});
