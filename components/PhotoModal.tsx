// Import the basic UI components
import { Button, Image, Modal, Text, View } from 'react-native';
// Import the styles of the app
import { styles } from '../styles';
// Import the photo data and the function that finds the picture
import { getPhotoUri, type Photo } from '../utils/photoStorage';

// Describe the data that the photo window needs
type PhotoModalProps = {
  photo: Photo | null;
  isBusy: boolean;
  onDelete: (photo: Photo) => void;
  onClose: () => void;
};

// Show one photo in full size
export default function PhotoModal({ photo, isBusy, onDelete, onClose }: PhotoModalProps) {
  return (
    <Modal
      // Full screen window for the open photo
      visible={photo !== null}
      animationType="slide"
      onRequestClose={onClose}
    >
      {photo && (
        <View
          // Container of the full screen window
          style={styles.modal}
        >
          <Image
            // Photo in full size
            source={{ uri: getPhotoUri(photo) }}
            style={styles.fullImage}
            resizeMode="contain"
          />
          <Text
            // Date when the photo was taken
            style={styles.text}
          >
            Date: {new Date(photo.takenAt).toLocaleString()}
          </Text>
          <Text
            // Coordinates where the photo was taken
            style={styles.text}
          >
            Location: {photo.latitude.toFixed(5)}, {photo.longitude.toFixed(5)}
          </Text>
          <Button
            // Button that deletes the open photo
            title="Delete"
            color="red"
            onPress={() => onDelete(photo)}
            // Do not delete while a new photo is being saved
            disabled={isBusy}
          />
          <Button
            // Button that closes the window
            title="Close"
            onPress={onClose}
          />
        </View>
      )}
    </Modal>
  );
}
