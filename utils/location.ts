// Import the phone location
import * as Location from 'expo-location';

// Get the current location of the phone
export async function getLocation() {
  try {
    // Read the exact location now
    return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  } catch {
    // Use the last known location if it is not older than 5 minutes
    return await Location.getLastKnownPositionAsync({ maxAge: 5 * 60 * 1000 });
  }
}
