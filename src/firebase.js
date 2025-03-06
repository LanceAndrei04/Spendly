import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAOlnXVmtvTP7OnAlFUc4auFQiLr1oswXI",
    authDomain: "spendly-c07e2.firebaseapp.com",
    projectId: "spendly-c07e2",
    storageBucket: "spendly-c07e2.firebasestorage.app",
    messagingSenderId: "266697242569",
    appId: "1:266697242569:web:ebd11821b8a459b5299a18",
    measurementId: "G-9GYS73DGTT"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app); 