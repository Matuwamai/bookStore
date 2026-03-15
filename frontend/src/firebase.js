import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

/* Firebase configuration */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Initialize Storage */
const storage = getStorage(app);

/**
 * Upload a single image
 */
export const uploadImage = (file, path, onProgress = () => {}) => {
  return new Promise((resolve, reject) => {
    try {
      /* Create unique file name */
      const uniqueName = `${Date.now()}-${file.name}`;

      /* Create storage reference */
      const storageRef = ref(storage, `${path}/${uniqueName}`);

      /* Start upload */
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Upload is ${progress}% done`);

          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Failed to get download URL:", error);
            reject(error);
          }
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Upload multiple images
 */
export const uploadMultipleImages = async (
  files,
  path,
  onProgress = () => {},
) => {
  try {
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const url = await uploadImage(file, path, (progress) => {
        const overallProgress = ((i + progress / 100) / files.length) * 100;

        if (onProgress) {
          onProgress(overallProgress);
        }
      });

      urls.push(url);
    }

    return urls;
  } catch (error) {
    console.error("Failed to upload images:", error);
    throw error;
  }
};

export default app;
