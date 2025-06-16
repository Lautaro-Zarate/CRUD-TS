import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 1 INTERFACE DE PELICULA
interface Pelicula {
    id: number;
    name: string;
    gender: string;
}

// 2 INTERFACE DEL ESTADO DE PELICULAS
interface PeliculasState{
    peliculas: Pelicula[];
}

// 3 ESTADO INCIAL
const initialState: PeliculasState = {
    peliculas: [],
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
    }
})



// EXPORTAMOS FUNCIONES Y REDUCER
export const {addMovie, deleteMovie, editMovie} = peliculasSlice.actions;
export default peliculasSlice.reducer;