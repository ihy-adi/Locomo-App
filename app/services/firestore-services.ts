import { db } from "@/FirebaseConfig";
import { 
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs
} from 'firebase/firestore';

export const FavoriteService = {
  // Add a favorite item as a document in the Favourites subcollection
  addFavorite: async (
    userId: string,
    favoriteData: {
      type: string;
      originalId: string;
      name: string;
      location: string;
      imageUrl: string;
      date?: string;
    }
  ) => {
    try {
      const docId = `${favoriteData.type}-${favoriteData.originalId}`;
      const favRef = doc(db, "users", userId, "Favourites", docId);
      await setDoc(favRef, favoriteData);
    } catch (e) {
      console.error("Error adding favorite: ", e);
      throw e;
    }
  },

  // Remove a favorite item by its type and originalId
  removeFavorite: async (userId: string, type: string, originalId: string) => {
    try {
      const docId = `${type}-${originalId}`;
      const favRef = doc(db, "users", userId, "Favourites", docId);
      await deleteDoc(favRef);
    } catch (e) {
      console.error("Error removing favorite: ", e);
      throw e;
    }
  },

  // Get all favorite items (optional, for debugging or other uses)
  getAllFavorites: async (userId: string): Promise<
    {
      id: string;
      type: string;
      originalId: string;
      name: string;
      location: string;
      imageUrl: string;
      date?: string;
    }[]
  > => {
    try {
      const favsRef = collection(db, "users", userId, "Favourites");
      const snapshot = await getDocs(favsRef);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as {
        type: string;
        originalId: string;
        name: string;
        location: string;
        imageUrl: string;
        date?: string;
      }) }));
    } catch (e) {
      console.error("Error getting favorites: ", e);
      throw e;
    }
  }
};