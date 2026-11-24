// Import the basic UI components
import { Alert, Button, View } from 'react-native';
// Import the functions that create an account and log out
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// Import the email and password form
import AccountForm from '../components/AccountForm';
// Import the styles of the app
import { styles } from '../styles';
// Import the login
import { auth } from '../utils/firebase';

// Describe the data that the register screen needs
type RegisterScreenProps = {
  onDone: () => void;
};

// Show the page that creates a new account
export default function RegisterScreen({ onDone }: RegisterScreenProps) {
  // Add the new account to Firebase
  const createAccount = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);

    // Firebase logs in a new user automatically, so log out
    await signOut(auth);

    // Tell the user and go back to the login page
    Alert.alert('Account created', `You can log in now with ${email}`);
    onDone();
  };

  return (
    <View
      // Register page
      style={styles.page}
    >
      <AccountForm
        // Form for the new account
        title="Create account"
        onSend={createAccount}
      />
      <Button
        // Button that goes back to the login page
        title="Back to log in"
        onPress={onDone}
      />
    </View>
  );
}
