import React, { useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from "@/FirebaseConfig";

type Props = {
  onPhotoUpdated: (url: string) => void;
};

const AddPhoto: React.FC<Props> = ({ onPhotoUpdated }) => {
  const [uploading, setUploading] = useState(false);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to your gallery to change photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // updated non-deprecated usage
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      await uploadImageAsync(uri);
    }
  };

  const uploadImageAsync = async (uri: string) => {
    try {
      setUploading(true);
      const user = auth.currentUser;
      if (!user) return;

      const blob = await (await fetch(uri)).blob();
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL: downloadURL });
      onPhotoUpdated(downloadURL);
    } catch (error: any) {
      console.error("Upload failed:", error);
      Alert.alert("Upload failed", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePickImage}>
        <Text style={{ color: "#780EBF", fontWeight: "600", textAlign: "center", marginTop: 10 }}>
          Change Photo
        </Text>
      </TouchableOpacity>
      {uploading && <ActivityIndicator style={{ marginTop: 10 }} />}
    </View>
  );
};

export default AddPhoto;
