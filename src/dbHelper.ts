/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, getDocs, setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, isFirebaseEnabled, handleFirestoreError, OperationType } from './firebase';
import { Camera } from './types';
import { SAMPLE_CAMERAS } from './data';

const LOCAL_STORAGE_KEY = 'vasanth_cameras_list';

// Helper to get all cameras from Firestore or LocalStorage
export async function getCamerasList(): Promise<Camera[]> {
  // If firebase is active and available
  if (isFirebaseEnabled && db) {
    const colPath = 'cameras';
    try {
      const snap = await getDocs(collection(db, colPath));
      if (snap.empty) {
        // If Firestore brand new and empty, seed it with our wonderful sample cameras
        const camerasArray: Camera[] = [];
        for (const item of SAMPLE_CAMERAS) {
          const docRef = doc(db, colPath, item.id);
          await setDoc(docRef, item);
          camerasArray.push(item);
        }
        return camerasArray;
      } else {
        const cameras: Camera[] = [];
        snap.forEach((docSnap) => {
          cameras.push(docSnap.data() as Camera);
        });
        return cameras;
      }
    } catch (err) {
      // Catch Firestore permission errors
      handleFirestoreError(err, OperationType.GET, colPath);
    }
  }

  // Fallback to local storage
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error("Local storage corruption, resetting to samples", e);
    }
  }

  // Seed local storage with sample cards
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SAMPLE_CAMERAS));
  return SAMPLE_CAMERAS;
}

// Helper to save a single camera to Firestore or LocalStorage
export async function saveCameraToDb(camera: Camera): Promise<void> {
  if (isFirebaseEnabled && db) {
    const docPath = `cameras/${camera.id}`;
    try {
      const docRef = doc(db, 'cameras', camera.id);
      await setDoc(docRef, camera);
      return;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, docPath);
    }
  }

  // Local storage save
  const currentList = await getCamerasList();
  const existingIndex = currentList.findIndex((item) => item.id === camera.id);
  if (existingIndex >= 0) {
    currentList[existingIndex] = camera;
  } else {
    currentList.unshift(camera); // Add new item at the top of listings
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentList));
}

// Delete camera support
export async function deleteCameraFromDb(id: string): Promise<void> {
  if (isFirebaseEnabled && db) {
    const docPath = `cameras/${id}`;
    try {
      const docRef = doc(db, 'cameras', id);
      await deleteDoc(docRef);
      return;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    }
  }

  const currentList = await getCamerasList();
  const updatedList = currentList.filter((item) => item.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
}
