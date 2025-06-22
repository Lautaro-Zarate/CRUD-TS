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
        <section className="create-movie-container">
            <div className="create-movie-absolute">
                <h1>Crear Película</h1>
                <div className="create-movie-inputs">
                    <input type="text" placeholder="Marvel, Star Wars..." value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder="Género/categoría" value={gender} onChange={(e) => setGender(e.target.value)}/>
                    <button onClick={() => dispatch(addPelicula({
                        name: name,
                        gender: gender,
                    }))}>Agregar</button>
                </div>
            </div>
        </section>
    )
}

export default CreateMovie;