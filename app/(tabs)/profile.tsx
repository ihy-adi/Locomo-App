import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const profile = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require("/Users/macbookair/Documents/proj_3rd_year/Locomo-App/assets/images/emoji4.png")} 
          style={styles.profileImage}
        />
        <Text style={styles.username}>Anandita S</Text>
        <Text style={styles.email}>anandita@example.com</Text>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/sign-in")}> 
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30, // More spacing below header
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12, // More space below image
  },
  username: {
    fontSize: 24, // Slightly larger
    fontWeight: "900", // Extra bold
    color: "#1B1E28",
    marginBottom: 6, // Space between username and email
  },
  email: {
    fontSize: 16, // Slightly larger
    color: "gray",
    fontWeight: "600", // Semi-bold for better readability
    marginBottom: 20, // Space before menu items
  },
  menu: {
    width: "100%",
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 18, // More padding for better tap area
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18, // Bigger font
    fontWeight: "700", // Bolder text
    color: "#1B1E28",
  },
  logoutButton: {
    marginTop: 40, // More space before logout button
    backgroundColor: "#780EBF",
    paddingVertical: 16, // Better button height
    paddingHorizontal: 90, // Slightly wider button
    borderRadius: 16,
    shadowColor: "#7D2EFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  logoutText: {
    color: "white",
    fontSize: 19, // Bigger font for readability
    fontWeight: "bold",
    textTransform: "uppercase", // Optional: Makes text look more defined
  },
});

export default profile;
