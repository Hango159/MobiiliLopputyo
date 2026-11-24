// Import the basic UI components
import { Button, Text, View } from 'react-native';
// Import the function that logs out
import { signOut } from 'firebase/auth';
// Import the styles of the app
import { styles } from '../styles';
// Import the login
import { auth } from '../utils/firebase';

// Show information about the app
export default function AboutScreen() {
  return (
    <View
      // About screen
      style={styles.page}
    >
      <Text
        // Title of the screen
        style={styles.title}
      >
        About this app
      </Text>
      <Text
        // Short description of the app
        style={styles.text}
      >
        Take a photo and the app saves it together with the place where it was taken. A small copy is saved in the cloud.
      </Text>
      <Text
        // Short explanation of how to use the app
        style={styles.text}
      >
        Open Map to see where every photo was taken. Open Photos to see or delete your photos.
      </Text>
      <Text
        // Email of the logged in user
        style={styles.text}
      >
        Logged in as {auth.currentUser?.email}
      </Text>
      <Button
        // Button that logs out
        title="Log out"
        onPress={() => signOut(auth)}
      />
    </View>
  );
}
