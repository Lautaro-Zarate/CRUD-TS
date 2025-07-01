import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

// 1. INTERFACE DE PELICULA
export interface Pelicula {
    id: string;
    name: string;
    gender: string;
}

// 2. INTERFACE DEL ESTADO
interface PeliculasState {
    peliculas: Pelicula[];
    loading: boolean;
    error: string | null;
}

// 3. ESTADO INICIAL
const initialState: PeliculasState = {
    peliculas: [],
    loading: false,
    error: null,
};

// 4. THUNKS (CRUD con Firebase)

// GET
export const fetchPeliculas = createAsyncThunk("peliculas/fetchPeliculas", async () => {
    const querySnapshot = await getDocs(collection(db, "peliculas"));
    const peliculas: Pelicula[] = [];
    querySnapshot.forEach((docSnap) => {
    peliculas.push({ id: docSnap.id, ...docSnap.data() } as Pelicula);
});
    return peliculas;
});

// ADD
export const addPelicula = createAsyncThunk(
    "peliculas/addPelicula",
    async ({ name, gender }: { name: string; gender: string }) => {
    const docRef = await addDoc(collection(db, "peliculas"), { name, gender });
    return { id: docRef.id, name, gender };
}
);

// DELETE
export const deletePelicula = createAsyncThunk("peliculas/deletePelicula", async (id: string) => {
    await deleteDoc(doc(db, "peliculas", id));
    return id;
});

// UPDATE
export const updatePelicula = createAsyncThunk("peliculas/updatePelicula", async (pelicula: Pelicula) => {
    const { id, ...rest } = pelicula;
    await updateDoc(doc(db, "peliculas", id), rest);
    return pelicula;
});

// 5. SLICE
const peliculasSlice = createSlice({
    name: "peliculas",
    initialState,
    reducers: {
    addMovie: (state, action: PayloadAction<Pelicula>) => {
    state.peliculas.push(action.payload);
    },
    deleteMovie: (state, action: PayloadAction<Pelicula>) => {
    state.peliculas = state.peliculas.filter((movie) => movie.id !== action.payload.id);
    },
    editMovie: (state, action: PayloadAction<Pelicula>) => {
    const index = state.peliculas.findIndex((movie) => movie.id === action.payload.id);
    if (index !== -1) {
        state.peliculas[index] = action.payload;
    }
    },
},
    extraReducers: (builder) => {
    // FETCH
    builder
    .addCase(fetchPeliculas.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchPeliculas.fulfilled, (state, action) => {
        state.loading = false;
        state.peliculas = action.payload;
    })
    .addCase(fetchPeliculas.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudieron cargar las películas";
    });

    // ADD
    builder
    .addCase(addPelicula.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(addPelicula.fulfilled, (state, action) => {
        state.loading = false;
        state.peliculas.push(action.payload);
    })
    .addCase(addPelicula.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al agregar película";
    });

    // DELETE
    builder
    .addCase(deletePelicula.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(deletePelicula.fulfilled, (state, action) => {
        state.loading = false;
        state.peliculas = state.peliculas.filter((p) => p.id !== action.payload);
    })
    .addCase(deletePelicula.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar película";
    });

    // UPDATE
    builder
    .addCase(updatePelicula.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updatePelicula.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.peliculas.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
            state.peliculas[index] = action.payload;
        }
    })
    .addCase(updatePelicula.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al editar película";
    });
},
});

// 6. EXPORTS
export const { addMovie, deleteMovie, editMovie } = peliculasSlice.actions;
export default peliculasSlice.reducer;
