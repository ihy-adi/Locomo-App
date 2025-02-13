// databaseService.ts
import { database } from "firebaseConfig";
import { ref, set, get, child, DataSnapshot } from "firebase/database";

// Function to write user data
export const writeUserData = async (userId: string, name: string, email: string): Promise<void> => {
  try {
    await set(ref(database, `users/${userId}`), {
      username: name,
      email: email,
    });
    console.log("Data written successfully");
  } catch (error: any) {
    console.error("Write error:", error.message);
  }
};

// Function to read user data
export const readUserData = async (userId: string): Promise<any> => {
  try {
    const dbRef = ref(database);
    const snapshot: DataSnapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error: any) {
    console.error("Read error:", error.message);
  }
};
