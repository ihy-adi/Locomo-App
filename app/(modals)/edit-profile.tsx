import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";
import { updateProfile, User } from "firebase/auth";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { auth } from "@/FirebaseConfig";
import AddPhoto from "@/app/(modals)/add-photo";

const EditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "");
      setImageUri(user.photoURL || null);  // Initialize imageUri with the current user's photo URL
    }
  }, []);

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleSave = async (): Promise<void> => {
    if (!displayName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;

      if (user) {
        // If an image URI is set, it should be passed to updateProfile
        const photoURL = imageUri || user.photoURL;  // If no new image, retain old one

        await updateProfile(user, {
          displayName: displayName.trim(),
          photoURL: photoURL,  // Ensure the profile photo is updated
        });

        await user.reload();  // Reload user to reflect profile update

        // Check if the photo URL has been updated successfully
        if (user.photoURL === photoURL) {
          console.log("Profile updated successfully with new photo URL.");
        }

        router.replace({
          pathname: '/(tabs)/profile',
          params: { updated: Date.now() },
        });
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "You need to grant permission to access media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.placeholder}></View>
        </View>
        
        <View style={styles.profileImageContainer}>
          <Image 
            source={
              imageUri 
                ? { uri: imageUri } 
                : require("../../assets/images/emoji5.png")
            }
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your name"
              autoCapitalize="words"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Birthday</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{formatDate(birthday)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoButton: {
    marginTop: 8,
  },
  changePhotoText: {
    color: "#780EBF",
    fontWeight: "600",
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1B1E28",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#780EBF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#7D2EFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;
