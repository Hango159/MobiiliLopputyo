// Import the basic UI components
import { Pressable, Text, View } from 'react-native';
// Import the styles of the app
import { styles } from '../styles';

// Names of the screens in the navbar
const SCREENS = ['Map', 'Photos', 'About'];

// Describe the data that the navbar needs
type NavbarProps = {
  screen: string;
  onChange: (screen: string) => void;
};

// Show the navbar at the bottom of the screen
export default function Navbar({ screen, onChange }: NavbarProps) {
  return (
    <View
      // Row with the names of the screens
      style={styles.navbar}
    >
      {SCREENS.map((name) => (
        <Pressable
          // Open the screen when its name is pressed
          key={name}
          style={styles.navItem}
          onPress={() => onChange(name)}
        >
          <Text
            // Name of the screen, highlighted when it is open
            style={[styles.navText, screen === name && styles.navTextActive]}
          >
            {name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
