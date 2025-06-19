import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// IMPORTS JSON SERVER 👇
import { createAsyncThunk } from "@reduxjs/toolkit";

// 1 INTERFACE DE PELICULA
interface Pelicula {
    id: number;
    name: string;
    gender: string;
}

// 2 INTERFACE DEL ESTADO DE PELICULAS
interface PeliculasState{
    peliculas: Pelicula[];
    loading: boolean;
    error: string | null;
}

// 3 ESTADO INCIAL
const initialState: PeliculasState = {
    peliculas: [],
    loading: false,
    error: null,
}


// 4 SLICE DE PELICULAS CON REDUCERS(FUNCIONES)
const peliculasSlice = createSlice({
    name: "peliculas",
    initialState,
    reducers:{
        addMovie: (state, action: PayloadAction<Pelicula>) => {
            state.peliculas.push(action.payload);
        },
        deleteMovie: (state, action: PayloadAction<Pelicula>) =>{
            state.peliculas = state.peliculas.filter((movie) => movie.id !== action.payload.id)
        },
        editMovie: (state, action: PayloadAction<Pelicula>) => {
            const movieToEdit = state.peliculas.findIndex(movie => movie.id === action.payload.id);
            if(movieToEdit !== -1){
                state.peliculas[movieToEdit] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        // TRAER PELICULAS
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
            state.error = "No se pudieron cargar las películas"
        });

        // AGREGAR
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
        })

        // BORRAR
        .addCase(deletePelicula.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deletePelicula.fulfilled, (state, action) => {
        state.loading = false;
        state.peliculas = state.peliculas.filter(p => p.id !== action.payload);
        })
        .addCase(deletePelicula.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar película";
    })

        // EDITAR
        .addCase(updatePelicula.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(updatePelicula.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.peliculas.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
            state.peliculas[index] = action.payload;
        }
        })
        .addCase(updatePelicula.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al editar película";
        });
        }
})



// THUNKS 👇

// GET METHOD
export const fetchPeliculas = createAsyncThunk(
    "peliculas/fetchPeliculas",
    async () => {
        const response = await fetch("http://localhost:3000/peliculas");
        const data = await response.json();
        return data;
    }
)

// CREATE METHOD
export const addPelicula = createAsyncThunk(
    "peliculas/addPelicula",
    async (pelicula: Pelicula) => {
    const response = await fetch("http://localhost:3000/peliculas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pelicula),
    });
    const data = await response.json();
    return data;
}
);

// DELETE METHOD
export const deletePelicula = createAsyncThunk(
    "peliculas/deletePelicula",
    async (id: number) => {
        await fetch(`http://localhost:3000/peliculas/${id}`,{
            method: "DELETE"
        });
        return id;
    }
);

// PUT METHOD
export const updatePelicula = createAsyncThunk(
    "peliculas/updatePelicula",
    async (pelicula: Pelicula) => {
        const response = await fetch(`http://localhost:3000/peliculas/${pelicula.id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(pelicula),
        });
        const data = await response.json();
        return data;
    }
);


// EXPORTAMOS FUNCIONES Y REDUCER
export const {addMovie, deleteMovie, editMovie} = peliculasSlice.actions;
export default peliculasSlice.reducer;