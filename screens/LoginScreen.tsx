// Import the basic UI components
import { Button, View } from 'react-native';
// Import the function that logs in
import { signInWithEmailAndPassword } from 'firebase/auth';
// Import the email and password form
import AccountForm from '../components/AccountForm';
// Import the styles of the app
import { styles } from '../styles';
// Import the login
import { auth } from '../utils/firebase';

// Describe the data that the login screen needs
type LoginScreenProps = {
  onRegister: () => void;
};

// Show the page that logs the user in
export default function LoginScreen({ onRegister }: LoginScreenProps) {
  // Log in with an account that already exists in Firebase
  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <View
      // Login page
      style={styles.page}
    >
      <AccountForm
        // Form for the existing account
        title="Log in"
        onSend={logIn}
      />
      <Button
        // Button that opens the register page
        title="Create a new account"
        onPress={onRegister}
      />
    </View>
  );
}
