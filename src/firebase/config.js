// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyASVIsv_I_yriATIjWI-NmFiswHFSeuRks",
	authDomain: "react-cursos-90332.firebaseapp.com",
	projectId: "react-cursos-90332",
	storageBucket: "react-cursos-90332.appspot.com",
	messagingSenderId: "590570792484",
	appId: "1:590570792484:web:dfaa611244535d8489dab1",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
