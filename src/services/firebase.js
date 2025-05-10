import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
export const login = async (credentials) => {
  const { email, password } = credentials;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: userCredential.user.displayName || email.split('@')[0],
      emailVerified: userCredential.user.emailVerified,
      createdAt: userCredential.user.metadata.creationTime
    };
  } catch (error) {
    console.error("Error signing in: ", error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out: ", error);
    throw new Error("Failed to sign out");
  }
};

// Get current user function
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) {
          resolve({
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            emailVerified: user.emailVerified,
            createdAt: user.metadata.creationTime
          });
        } else {
          resolve(null);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Register function
export const register = async (userData) => {
  const { email, password } = userData;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: userCredential.user.displayName || email.split('@')[0],
      emailVerified: userCredential.user.emailVerified,
      createdAt: userCredential.user.metadata.creationTime
    };
  } catch (error) {
    console.error("Error creating user: ", error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email is already in use';
    case 'auth/invalid-email':
      return 'Invalid email format';
    case 'auth/user-disabled':
      return 'This user account has been disabled';
    case 'auth/user-not-found':
      return 'No user found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Try again later.';
    default:
      return 'Authentication failed. Please try again.';
  }
};