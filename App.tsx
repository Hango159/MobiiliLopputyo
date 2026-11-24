// Import the React hooks for state and effects
import { useEffect, useState } from 'react';
// Import the basic container component
import { View } from 'react-native';
// Import the phone status bar
import { StatusBar } from 'expo-status-bar';
// Import the function that listens for log in and log out
import { onAuthStateChanged, type User } from 'firebase/auth';
// Import the screens
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
// Import the styles of the app
import { styles } from './styles';
// Import the login
import { auth } from './utils/firebase';

// Start of the app
export default function App() {
  // Keep the logged in user (empty while Firebase is checking)
  const [user, setUser] = useState<User | null>();
  // Remember if the register page is open
  const [isRegistering, setIsRegistering] = useState(false);

  // Update the user after log in and log out
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <View
      // Main container of the app
      style={styles.container}
    >
      {
        // Show the register page while a new account is created
        isRegistering && <RegisterScreen onDone={() => setIsRegistering(false)} />
      }
      {
        // Show the login page if the user is logged out
        !isRegistering && user === null && <LoginScreen onRegister={() => setIsRegistering(true)} />
      }
      {
        // Show the app only after the user has logged in
        !isRegistering && user && <MainScreen userId={user.uid} />
      }
      <StatusBar
        // Phone status bar with dark text
        style="dark"
      />
    </View>
  );
}
