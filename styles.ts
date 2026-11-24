// Import the tool that creates styles
import { StyleSheet } from 'react-native';

// Basic styles of the app
export const styles = StyleSheet.create({
  // Fill the whole screen
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Use all the free space
  content: {
    flex: 1,
  },
  // Small picture on the map
  markerImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  // Area under the map
  bottom: {
    padding: 10,
  },
  // Small picture in the list
  listImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  // Screen that covers the map
  page: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    paddingTop: 60,
    gap: 10,
    backgroundColor: '#fff',
  },
  // Title of a screen
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Put the photos in rows
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  // Picture in the grid
  gridImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  // Row at the bottom of the screen
  navbar: {
    flexDirection: 'row',
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  // One button in the navbar
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  // Text in the navbar
  navText: {
    fontSize: 16,
    color: '#555',
  },
  // Text of the open screen in the navbar
  navTextActive: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  // Full screen photo window
  modal: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 50,
    gap: 10,
    backgroundColor: '#fff',
  },
  // Photo in full size
  fullImage: {
    flex: 1,
  },
  // Normal text
  text: {
    fontSize: 16,
  },
  // Text field in the login form
  input: {
    padding: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
});
