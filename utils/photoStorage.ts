// Import the tools for reading and writing files on the phone
import { File, Paths } from 'expo-file-system';

// Describe the data that is saved for every photo
export type Photo = {
  // Unique id of the photo
  id: string;
  // Name of the image file on the phone
  fileName: string;
  // Coordinates where the photo was taken
  latitude: number;
  longitude: number;
  // Date and time when the photo was taken
  takenAt: string;
};

// Point to the JSON file that keeps the list of photos of one user
function getListFile(userId: string): File {
  return new File(Paths.document, `photos-${userId}.json`);
}

// Get the full path of an image from its file name
export function getPhotoUri(photo: Photo): string {
  return new File(Paths.document, photo.fileName).uri;
}

// Load the saved list of photos from the phone
export function loadPhotos(userId: string): Photo[] {
  const listFile = getListFile(userId);

  // Give the photos saved before the login existed to the first user
  const oldListFile = new File(Paths.document, 'photos.json');
  if (oldListFile.exists) {
    oldListFile.moveSync(listFile);
  }

  // Return an empty list if nothing was saved yet
  if (!listFile.exists) {
    return [];
  }

  // Read the JSON text and convert it back to a list
  return JSON.parse(listFile.textSync());
}

// Save the list of photos on the phone
export function savePhotos(userId: string, photos: Photo[]): void {
  getListFile(userId).writeSync(JSON.stringify(photos));
}

// Copy the image from the temporary camera folder to permanent storage
export async function saveImage(cameraUri: string, fileName: string): Promise<void> {
  await new File(cameraUri).copy(new File(Paths.document, fileName));
}

// Save a picture from the cloud on the phone
export function restoreImage(photo: Photo, image: string): void {
  const file = new File(Paths.document, photo.fileName);

  // Keep the original picture if it is still on the phone
  if (!file.exists) {
    file.writeSync(image, { encoding: 'base64' });
  }
}

// Delete the image file from the phone
export function deleteImage(photo: Photo): void {
  new File(Paths.document, photo.fileName).delete();
}
