import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYdPP-LKSZr4iE7YZw_bTr97JBKweO6uw",
  authDomain: "blog-clone1.firebaseapp.com",
  projectId: "blog-clone1",
  storageBucket: "blog-clone1.appspot.com",
  messagingSenderId: "295825015347",
  appId: "1:295825015347:web:97ae972cf96cedb91d5946",
  measurementId: "G-8N6NTLD1RF",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";
/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
