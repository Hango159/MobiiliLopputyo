// Import the React hooks for state and effects
import { useEffect, useState } from 'react';
// Import the message window
import { Alert } from 'react-native';
// Import the camera
import * as ImagePicker from 'expo-image-picker';
// Import the functions that save photos in the cloud
import { deleteCloudPhoto, syncPhotos, uploadPhoto } from '../utils/cloudPhotos';
// Import the function that gets the phone location
import { getLocation } from '../utils/location';
// Import the function that checks the permissions
import { checkPermissions } from '../utils/permissions';
// Import the functions that save, load and delete photos
import { deleteImage, loadPhotos, saveImage, savePhotos, type Photo } from '../utils/photoStorage';

// Tell the user that the cloud did not answer
function showCloudError(error: Error) {
  Alert.alert('Cloud error', `The cloud copy was not updated. ${error.message}`);
}

// Keep the photos of one user and the actions for them in one place
export function usePhotos(userId: string) {
  // Keep the list of photos, starting with the saved ones
  const [photos, setPhotos] = useState<Photo[]>(() => loadPhotos(userId));
  // Remember if a photo is being taken or saved
  const [isBusy, setIsBusy] = useState(false);

  // Add a photo to the list if it is not there yet
  const addPhoto = (photo: Photo) => {
    setPhotos((current) => (current.some((item) => item.id === photo.id) ? current : [...current, photo]));
  };

  // Save the list on the phone every time it changes
  useEffect(() => {
    savePhotos(userId, photos);
  }, [photos]);

  // Sync the photos with the cloud when the app starts
  useEffect(() => {
    syncPhotos(userId, photos, addPhoto).catch(showCloudError);
  }, []);

  // Take a photo and save it together with the location
  const takePhoto = async (): Promise<Photo | null> => {
    // Disable the button while working
    setIsBusy(true);

    try {
      // Stop if the app has no permission
      if (!(await checkPermissions())) {
        return null;
      }

      // Open the camera
      const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });

      // Stop if the user closed the camera without a photo
      if (result.canceled) {
        return null;
      }

      // Get the place where the photo was taken
      const location = await getLocation();

      // Stop if the location was not found
      if (!location) {
        Alert.alert('No location', 'The location was not found, so the photo was not saved.');
        return null;
      }

      // Create a unique id from the current time
      const id = Date.now().toString();

      // Create the new photo data
      const newPhoto: Photo = {
        id,
        fileName: `photo-${id}.jpg`,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        takenAt: new Date().toISOString(),
      };

      // Save the picture on the phone and add it to the list
      await saveImage(result.assets[0].uri, newPhoto.fileName);
      addPhoto(newPhoto);

      // Save a copy in the cloud without waiting for it
      uploadPhoto(userId, newPhoto).catch(showCloudError);

      // Give back the new photo
      return newPhoto;
    } catch {
      // Tell the user that something failed
      Alert.alert('Error', 'The photo could not be saved.');
      return null;
    } finally {
      // Enable the button again
      setIsBusy(false);
    }
  };

  // Delete a photo from the cloud, the list, the map and the phone
  const deletePhoto = async (photo: Photo) => {
    try {
      // Remove the cloud copy first, so the photo does not come back later
      await deleteCloudPhoto(userId, photo);

      // Keep all the photos except the deleted one
      setPhotos((current) => current.filter((item) => item.id !== photo.id));

      // Remove the image file
      deleteImage(photo);
    } catch (error) {
      // Keep the photo if the cloud did not answer
      showCloudError(error as Error);
    }
  };

  // Give the photos and the actions to the app
  return { photos, isBusy, takePhoto, deletePhoto };
}
