// Import the basic UI components
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
// Import the styles of the app
import { styles } from '../styles';
// Import the photo data and the function that finds the picture
import { getPhotoUri, type Photo } from '../utils/photoStorage';

// Describe the data that the photos screen needs
type PhotosScreenProps = {
  photos: Photo[];
  onOpenPhoto: (photo: Photo) => void;
};

// Show all the photos in a grid
export default function PhotosScreen({ photos, onOpenPhoto }: PhotosScreenProps) {
  return (
    <View
      // Photos screen
      style={styles.page}
    >
      <Text
        // Title with the number of photos
        style={styles.title}
      >
        My photos ({photos.length})
      </Text>
      <ScrollView
        // Grid with all the photos
        contentContainerStyle={styles.grid}
      >
        {photos.map((photo) => (
          <Pressable
            // Open the photo in full size when it is pressed
            key={photo.id}
            onPress={() => onOpenPhoto(photo)}
          >
            <Image
              // Picture in the grid
              source={{ uri: getPhotoUri(photo) }}
              style={styles.gridImage}
              resizeMethod="resize"
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
