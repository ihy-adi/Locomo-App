import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { FIREBASE_AUTH, db } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, form.email, form.password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName: form.username });

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: form.username,
        email: form.email,
        uid: user.uid
      });

      router.replace("/sign-in"); // Redirect to login page after sign up
    } catch (err) {
      setError("Failed to create account. Try again.");
      console.error(err);
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image source={require('../../assets/images/Locomo_logo.jpeg')} resizeMode='contain' style={styles.logo} />
          <Text style={styles.title}>Sign Up to Locomo</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <FormField 
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherstyles={styles.formField}
          />
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

          <CustomButton title="Sign Up" handlePress={submit} containerStyles={styles.button} textStyles={styles.buttonText} isLoading={isSubmitting} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href='/sign-in' style={styles.footerLink}>Log In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 24,
    
  },
  logo: {
    width: 155,
    height: 155,
    marginBottom: 24,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center'
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
    elevation: 5, // Shadow for Android
    marginTop: 60,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'row',
    gap: 8,
  },
  footerText: {
    color: '#7b7b8b',
    fontSize: 14,
  },
  footerLink: {
    color: '#780EBF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default SignUp;
