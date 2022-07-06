import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABC6VPl7p-HXU0U2MMjNnBM9kehUiN978',
  authDomain: 'cloud-agnostic-24580.firebaseapp.com',
  projectId: 'cloud-agnostic-24580',
  storageBucket: 'cloud-agnostic-24580.appspot.com',
  messagingSenderId: '681921132678',
  appId: '1:681921132678:web:c426719bc41552d5ac3907',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
