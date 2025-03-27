import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkBU9PVXJh7maxcRWg2sekbX4RkkpOqT0",
    authDomain: "taskmate-mobile-app-b17ec.firebaseapp.com",
    projectId: "taskmate-mobile-app-b17ec",
    storageBucket: "taskmate-mobile-app-b17ec.appspot.com",
    messagingSenderId: "620398635607",
    appId: "1:620398635607:web:54035283ca937ee58fd112"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
