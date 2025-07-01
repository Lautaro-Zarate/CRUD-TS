import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc} from "firebase/firestore";

const peliculas = collection(db, "peliculas");


// FUNCION GET 

export const getPeliculas = async () => {
    const snapshot = await getDocs(peliculas);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
}

// FUNCION POST
export const addPelicula = async (pelicula: { name: string; gender: string}) => {
    const docRef = await addDoc(peliculas, pelicula);
    return { id: docRef.id, ...pelicula};
} 


// FUNCION DELETE

export const deletePelicula = async (id: string) => {
    const docRef = doc(db, "peliculas", id);
    await deleteDoc(docRef);
    return id;
} 


// FUNCION PUT/UPDATE


export const updatePelicula = async (id: string, pelicula: { name: string; gender:string}) => {
    const docRef = doc(db, "peliculas", id);
    await updateDoc(docRef, pelicula);
    return {id, ...pelicula};
}