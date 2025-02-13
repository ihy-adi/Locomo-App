// components/AuthScreen.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { cn } from "@/lib/utils";

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
        router.replace("/home");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.replace("/home");
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-background p-6">
      <Text className="text-3xl font-bold text-primary mb-6">
        {type === "login" ? "Welcome Back!" : "Create an Account"}
      </Text>

      <TextInput
        className="w-full p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        className="w-full p-4 rounded-lg border border-gray-300 mb-6"
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className={cn("w-full p-4 rounded-lg bg-primary", loading && "opacity-50")}
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-center text-white text-lg font-bold">
            {type === "login" ? "Log In" : "Sign Up"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(type === "login" ? "/signup" : "/login")} className="mt-4">
        <Text className="text-primary">
          {type === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
