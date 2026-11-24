// Import the tool that makes pictures smaller
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
// Import the database functions
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';
// Import the database
import { db } from './firebase';
// Import the functions that read and write pictures on the phone
import { getPhotoUri, restoreImage, type Photo } from './photoStorage';

// Make a small copy of a picture so it fits in the database
async function makeSmallImage(photo: Photo) {
  const image = await ImageManipulator.manipulate(getPhotoUri(photo)).resize({ width: 800 }).renderAsync();
  const result = await image.saveAsync({ base64: true, compress: 0.5, format: SaveFormat.JPEG });
  return result.base64;
}

// Save a photo in the cloud
export async function uploadPhoto(userId: string, photo: Photo) {
  // Save the picture as text
  const image = await makeSmallImage(photo);
  await setDoc(doc(db, 'users', userId, 'images', photo.id), { image });

  // Save the location and the date
  await setDoc(doc(db, 'users', userId, 'photos', photo.id), photo);
}

// Get the list of photos from the cloud
async function getCloudPhotos(userId: string) {
  const result = await getDocs(collection(db, 'users', userId, 'photos'));
  return result.docs.map((item) => item.data() as Photo);
}

// Save a picture from the cloud on the phone
async function downloadImage(userId: string, photo: Photo) {
  const result = await getDoc(doc(db, 'users', userId, 'images', photo.id));
  restoreImage(photo, result.get('image'));
}

// Delete a photo from the cloud
export async function deleteCloudPhoto(userId: string, photo: Photo) {
  await deleteDoc(doc(db, 'users', userId, 'photos', photo.id));
  await deleteDoc(doc(db, 'users', userId, 'images', photo.id));
}

// Copy the missing photos between the phone and the cloud
export async function syncPhotos(userId: string, phonePhotos: Photo[], onNewPhoto: (photo: Photo) => void) {
  const cloudPhotos = await getCloudPhotos(userId);

  // Download the photos that are only in the cloud
  for (const photo of cloudPhotos) {
    if (!phonePhotos.some((item) => item.id === photo.id)) {
      await downloadImage(userId, photo);
      onNewPhoto(photo);
    }
  }

  // Upload the photos that are only on the phone
  for (const photo of phonePhotos) {
    if (!cloudPhotos.some((item) => item.id === photo.id)) {
      await uploadPhoto(userId, photo);
    }
  }
}
