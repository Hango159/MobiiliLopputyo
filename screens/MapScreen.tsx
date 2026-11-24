// Import the React hook for references
import { useRef } from 'react';
// Import the basic UI components
import { Button, Image, Pressable, ScrollView, View } from 'react-native';
// Import the map
import MapView from 'react-native-maps';
// Import the photo marker
import PhotoMarker from '../components/PhotoMarker';
// Import the styles of the app
import { styles } from '../styles';
// Import the photo data and the function that finds the picture
import { getPhotoUri, type Photo } from '../utils/photoStorage';

// Map area shown when the app starts (the world)
const WORLD_REGION = {
  latitude: 20,
  longitude: 10,
  latitudeDelta: 120,
  longitudeDelta: 120,
};

// Describe the data that the map screen needs
type MapScreenProps = {
  photos: Photo[];
  isBusy: boolean;
  takePhoto: () => Promise<Photo | null>;
  onOpenPhoto: (photo: Photo) => void;
};

// Show the world map with all the photos
export default function MapScreen({ photos, isBusy, takePhoto, onOpenPhoto }: MapScreenProps) {
  // Keep a reference to the map so it can be moved
  const mapRef = useRef<MapView>(null);

  // Move the map to the place where a photo was taken
  const showOnMap = (photo: Photo) => {
    mapRef.current?.animateToRegion({
      latitude: photo.latitude,
      longitude: photo.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  // Take a photo and show it on the map
  const handleTakePhoto = async () => {
    const newPhoto = await takePhoto();

    // Move the map only if a photo was saved
    if (newPhoto) {
      showOnMap(newPhoto);
    }
  };

  return (
    <View
      // Map screen, always kept open under the other screens
      style={styles.content}
      // Keep the raised Android button inside this screen
      collapsable={false}
    >
      <MapView
        // World map
        ref={mapRef}
        style={styles.content}
        initialRegion={WORLD_REGION}
        // Hide the Google Maps buttons on Android
        toolbarEnabled={false}
      >
        {photos.map((photo) => (
          <PhotoMarker
            // Put every photo on the map
            key={photo.id}
            photo={photo}
            onPress={() => onOpenPhoto(photo)}
          />
        ))}
      </MapView>

      <View
        // Bottom area with the photo list and the button
        style={styles.bottom}
      >
        <ScrollView
          // Horizontal list of all photos
          horizontal
        >
          {photos.map((photo) => (
            <Pressable
              // Move the map to the photo when it is pressed
              key={photo.id}
              onPress={() => showOnMap(photo)}
            >
              <Image
                // Small picture in the list
                source={{ uri: getPhotoUri(photo) }}
                style={styles.listImage}
                resizeMethod="resize"
              />
            </Pressable>
          ))}
        </ScrollView>

        <Button
          // Button that opens the camera
          title={isBusy ? 'Please wait...' : 'Take photo'}
          onPress={handleTakePhoto}
          disabled={isBusy}
        />
      </View>
    </View>
  );
}
