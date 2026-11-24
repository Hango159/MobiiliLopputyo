// Import the React hook for state
import { useState } from 'react';
// Import the picture component
import { Image } from 'react-native';
// Import the map marker
import { Marker } from 'react-native-maps';
// Import the styles of the app
import { styles } from '../styles';
// Import the photo data and the function that finds the picture
import { getPhotoUri, type Photo } from '../utils/photoStorage';

// Describe the data that a photo marker needs
type PhotoMarkerProps = {
  photo: Photo;
  onPress: () => void;
};

// Show one photo as a small picture on the map
export default function PhotoMarker({ photo, onPress }: PhotoMarkerProps) {
  // Remember if the picture has finished loading
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Marker
      // Place the marker where the photo was taken
      coordinate={{ latitude: photo.latitude, longitude: photo.longitude }}
      // Open the photo when the marker is pressed
      onPress={onPress}
      // Stop redrawing the marker after the picture has loaded
      tracksViewChanges={!isLoaded}
    >
      <Image
        // Show the saved picture inside the marker
        source={{ uri: getPhotoUri(photo) }}
        style={styles.markerImage}
        // Use a small version of the picture to save memory
        resizeMethod="resize"
        // Show the picture without a fade animation
        fadeDuration={0}
        // Mark the picture as loaded
        onLoad={() => setIsLoaded(true)}
      />
    </Marker>
  );
}
