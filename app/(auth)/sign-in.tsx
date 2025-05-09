import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const auth = getAuth(); // ✅ Fix: Get auth instance properly
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.replace("/(tabs)/home"); // Redirect to home after login
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }

    setIsSubmitting(false);
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError("Please enter your email address first");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    setResetSent(false);
    
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, form.email);
      setResetSent(true);
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
      console.error(err);
    }
    
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/images/Locomo_logo.jpeg")}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Log in to Locomo</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {resetSent ? <Text style={styles.successText}>Password reset email sent! Please check your inbox.</Text> : null}

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherstyles={styles.formField}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherstyles={styles.formField}
            secureTextEntry
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.button}
            textStyles={styles.buttonText}
            isLoading={isSubmitting}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/sign-up" style={styles.footerLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 155,
    height: 155,
    marginBottom: 24,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  formField: {
    marginTop: 17,
  },
  button: {
    width: 375,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#780EBF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7D2EFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
    marginTop: 30, // Reduced from 60 to make room for forgot password
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
    gap: 8,
  },
  footerText: {
    color: "#7b7b8b",
    fontSize: 14,
  },
  footerLink: {
    color: "#780EBF",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: "#780EBF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    marginTop: 8,
    marginBottom: 15,
  }
});

export default SignIn;