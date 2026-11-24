// Import the message window
import { Alert } from 'react-native';
// Import the camera
import * as ImagePicker from 'expo-image-picker';
// Import the phone location
import * as Location from 'expo-location';

// Check that the app is allowed to use the camera and the location
export async function checkPermissions(): Promise<boolean> {
  // Ask the user for camera access
  const camera = await ImagePicker.requestCameraPermissionsAsync();
  // Ask the user for location access
  const location = await Location.requestForegroundPermissionsAsync();

  // Stop if the user said no to one of them
  if (!camera.granted || !location.granted) {
    Alert.alert('Permission needed', 'Please allow camera and location in the phone settings.');
    return false;
  }

  // Stop if the location is turned off on the phone
  if (!(await Location.hasServicesEnabledAsync())) {
    Alert.alert('Location is off', 'Please turn on the location on your phone.');
    return false;
  }

  // Everything is allowed
  return true;
}
