import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bucket_url = import.meta.env.VITE_BUCKET_URL;

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

/**
 * Uploads an image file to Firebase Storage.
 * @param file - The image file to upload.
 * @param path - The storage path where the file will be stored.
 * @param onProgress - Optional callback to track upload progress.
 * @returns A promise that resolves with the download URL of the uploaded image.
 */
export const uploadImage = (
  file,
  path,
  onProgress = () => {}
) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app, bucket_url); // Get the Firebase Storage instance
    const storageRef = ref(storage, `${path}/${file.name}`); // Create a reference to the file's location in storage

    const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track the upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress); // Trigger progress callback if provided
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle upload errors
        console.error("Upload failed:", error);
        reject(error);
      },
      async () => {
        // Get the download URL after successful upload
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error("Failed to get download URL:", error);
          reject(error);
        }
      }
    );
  });
};

/**
 * Uploads multiple image files to Firebase Storage.
 * @param files - An array of image files to upload.
 * @param path - The storage path where the files will be stored.
 * @param onProgress - Optional callback to track overall upload progress.
 * @returns A promise that resolves with an array of download URLs for the uploaded images.
 */
export const uploadMultipleImages = async (
  files,
  path,
  onProgress=() => {}
) => {
  let uploadedCount = 0;
  const totalFiles = files.length;
  const downloadURLs = [];

  return new Promise((resolve, reject) => {
    const uploadPromises = files.map((file) =>
      uploadImage(file, path, (fileProgress) => {
        uploadedCount += fileProgress / totalFiles;
        if (onProgress) onProgress(Math.min(uploadedCount, 100));
      }).then((url) => {
        downloadURLs.push(url);
      })
    );
    Promise.all(uploadPromises)
      .then(() => resolve(downloadURLs))
      .catch((error) => {
        console.log(error);
        console.error("Failed to upload images:", error);
        reject(error);
      });
  });
};

export default app;
