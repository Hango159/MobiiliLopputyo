// Import the storage that keeps the user logged in
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import the function that starts Firebase
import { initializeApp } from 'firebase/app';
// Import the function that starts the login
import { initializeAuth } from 'firebase/auth';
// @ts-expect-error This function exists on the phone but is missing from the Firebase types
import { getReactNativePersistence } from 'firebase/auth';
// Import the database
import { getFirestore, setLogLevel } from 'firebase/firestore/lite';
// Import the settings of the Firebase project
import { firebaseConfig } from '../firebaseConfig';

// Start Firebase
const app = initializeApp(firebaseConfig);

// Start the login and remember the user on the phone
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Start the database
export const db = getFirestore(app);

// Do not print whole pictures in the console when an upload fails
setLogLevel('silent');
