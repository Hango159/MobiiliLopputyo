// Import the React hook for state
import { useState } from 'react';
// Import the basic container component
import { View } from 'react-native';
// Import the parts of the app
import Navbar from '../components/Navbar';
import PhotoModal from '../components/PhotoModal';
// Import the photos and their actions
import { usePhotos } from '../hooks/usePhotos';
// Import the styles of the app
import { styles } from '../styles';
// Import the photo data
import { type Photo } from '../utils/photoStorage';
// Import the screens
import AboutScreen from './AboutScreen';
import MapScreen from './MapScreen';
import PhotosScreen from './PhotosScreen';

// Describe the data that the main screen needs
type MainScreenProps = {
  userId: string;
};

// Show the app to the logged in user
export default function MainScreen({ userId }: MainScreenProps) {
  // Get the photos and their actions
  const { photos, isBusy, takePhoto, deletePhoto } = usePhotos(userId);
  // Keep the name of the open screen
  const [screen, setScreen] = useState('Map');
  // Keep the photo that is open in full size
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

  // Close the full screen window and delete the photo
  const handleDelete = (photo: Photo) => {
    setOpenPhoto(null);
    deletePhoto(photo);
  };

  return (
    <View
      // Container of the main screen
      style={styles.content}
    >
      <View
        // Area above the navbar that holds the screens
        style={styles.content}
      >
        <MapScreen
          // Map screen, always kept open under the other screens
          photos={photos}
          isBusy={isBusy}
          takePhoto={takePhoto}
          onOpenPhoto={setOpenPhoto}
        />

        {screen === 'Photos' && (
          <PhotosScreen
            // Photos screen
            photos={photos}
            onOpenPhoto={setOpenPhoto}
          />
        )}

        {
          // About screen
          screen === 'About' && <AboutScreen />
        }
      </View>

      <Navbar
        // Navbar that changes the screen
        screen={screen}
        onChange={setScreen}
      />

      <PhotoModal
        // Window with the open photo
        photo={openPhoto}
        isBusy={isBusy}
        onDelete={handleDelete}
        onClose={() => setOpenPhoto(null)}
      />
    </View>
  );
}
