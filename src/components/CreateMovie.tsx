import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";
// import { addMovie } from "../store/slices/peliculasSlice";
import { addPelicula, fetchPeliculas } from "../store/slices/peliculasSlice";
import type { AppDispatch } from "../store/store";

const CreateMovie = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");

    const dispatch = useDispatch<AppDispatch>();

        useEffect(() => {
        dispatch(fetchPeliculas())
    }, [])

    return(
        <div>
            <h1>Crear Película/Serie</h1>
            <div>
                <input type="text" placeholder="Marvel, Star Wars..." value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Género/categoría" value={gender} onChange={(e) => setGender(e.target.value)}/>
                <button onClick={() => dispatch(addPelicula({
                    name: name,
                    gender: gender,
                }))}>Agregar</button>
            </div>
        </div>
    )
}

export default CreateMovie;