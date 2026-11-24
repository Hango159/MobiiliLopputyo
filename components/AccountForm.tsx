// Import the React hook for state
import { useState } from 'react';
// Import the basic UI components
import { Alert, Button, Text, TextInput } from 'react-native';
// Import the styles of the app
import { styles } from '../styles';
// Import the functions that check the email
import { cleanEmail, isEmail } from '../utils/email';

// Describe the data that the form needs
type AccountFormProps = {
  title: string;
  onSend: (email: string, password: string) => Promise<void>;
};

// Show the email and password form used to log in and to create an account
export default function AccountForm({ title, onSend }: AccountFormProps) {
  // Keep the text written by the user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Remember if the form is being sent
  const [isBusy, setIsBusy] = useState(false);

  // Check the form and send it
  const send = async () => {
    const readyEmail = cleanEmail(email);

    // Stop if the email is not complete and show what was written
    if (!isEmail(readyEmail)) {
      Alert.alert('Wrong email', `"${readyEmail}" is not a full email. Write it like this: name@example.com`);
      return;
    }

    // Stop if the password is too short
    if (password.length < 6) {
      Alert.alert('Wrong password', 'The password must have at least 6 characters.');
      return;
    }

    // Disable the button while working
    setIsBusy(true);

    try {
      await onSend(readyEmail, password);
    } catch (error) {
      // Show the error and the email that was sent
      Alert.alert('Error', `${(error as Error).message} Email: "${readyEmail}"`);
    } finally {
      // Enable the button again
      setIsBusy(false);
    }
  };

  return (
    <>
      <Text
        // Title of the form
        style={styles.title}
      >
        {title}
      </Text>
      <Text
        // Label of the email field
        style={styles.text}
      >
        Email (for example name@example.com)
      </Text>
      <TextInput
        // Field for the email
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text
        // Label of the password field
        style={styles.text}
      >
        Password (at least 6 characters)
      </Text>
      <TextInput
        // Field for the password
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        // Button that sends the form
        title={isBusy ? 'Please wait...' : title}
        onPress={send}
        disabled={isBusy}
      />
    </>
  );
}
