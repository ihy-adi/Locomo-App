import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {
        // Handle form submission
        // Firebase add here
    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../../assets/images/Locomo_logo.jpeg')} // Ensure correct path
            resizeMode='contain'
            style={styles.logo}
          />
          <Text style={styles.title}>
            Sign Up to Locomo
          </Text>
          <FormField 
          title="Username"
          value={form.username}
          placeholder="Enter your email"
          handleChangeText={(e: string) => setForm({ ...form, email: e })}
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
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles = {styles.button}
            textStyles = {styles.buttonText}
            isLoading={isSubmitting}
            />

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
  }
});

export default SignUp;