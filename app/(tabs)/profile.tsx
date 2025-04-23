import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/FirebaseConfig"; // Ensure Firebase is correctly configured

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to force re-render

  // This effect runs whenever the screen comes into focus (like when returning from edit profile)
  useFocusEffect(
    React.useCallback(() => {
      // Force refresh every time the profile screen is focused
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Create a fresh user object to avoid React not detecting changes
        setUser({...currentUser});
        setRefreshKey(prevKey => prevKey + 1); // Increment to force re-render
      }
      setLoading(false);
      
      return () => {}; // No cleanup needed
    }, [])
  );

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({...currentUser}); // Create a new object to ensure React detects changes
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/sign-in"); // Redirect after logout
    } catch (error: any) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#780EBF" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={user?.photoURL ? { uri: user.photoURL } : require("../../assets/images/emoji5.png")} 
          style={styles.profileImage} 
        />
        <Text style={styles.username} key={`name-${refreshKey}`}>{user?.displayName || "User"}</Text>
        <Text style={styles.email}>{user?.email || "No email available"}</Text>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/(modals)/edit-profile')}
        >
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/(tabs)/FavoritesScreen')}
        >
          <Text style={styles.menuText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/(modals)/change-password')}
        >
          <Text style={styles.menuText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingHorizontal: 20 },
  profileHeader: { alignItems: "center", marginTop: 40, marginBottom: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  username: { fontSize: 24, fontWeight: "900", color: "#1B1E28", marginBottom: 6 },
  email: { fontSize: 16, color: "gray", fontWeight: "600", marginBottom: 20 },
  menu: { width: "100%", marginTop: 20 },
  menuItem: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  menuText: { fontSize: 18, fontWeight: "700", color: "#1B1E28" },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#780EBF",
    paddingVertical: 16,
    paddingHorizontal: 90,
    borderRadius: 16,
    shadowColor: "#7D2EFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: { color: "white", fontSize: 19, fontWeight: "bold", textTransform: "uppercase" },
});

export default Profile;
