// authService.ts
import { auth } from "firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from "firebase/auth";

// Sign-up function
export const signUp = async (email: string, password: string): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully");
  } catch (error: any) {
    console.error("Sign-up error:", error.message);
  }
};

// Sign-in function
export const signIn = async (email: string, password: string): Promise<UserCredential | void> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("Sign-in error:", error.message);
  }
};

// Log-out function
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error: any) {
    console.error("Logout error:", error.message);
  }
};
