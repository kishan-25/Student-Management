import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// This component is for debugging purposes to confirm Firebase Auth is working
const FirebaseAuthObserver = () => {
  useEffect(() => {
    const auth = getAuth();
    
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('Firebase Auth: User is signed in', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
      } else {
        // User is signed out
        console.log('Firebase Auth: User is signed out');
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default FirebaseAuthObserver;