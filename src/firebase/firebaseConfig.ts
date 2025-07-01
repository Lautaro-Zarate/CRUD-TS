import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDwqLf6RBwjTZKz1pCcwlKpdUVrdHr0Iic",
    authDomain: "crudflix.firebaseapp.com",
    projectId: "crudflix",
    storageBucket: "crudflix.firebasestorage.app",
    messagingSenderId: "734527354495",
    appId: "1:734527354495:web:f16a9635bb768cd29d314a"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };