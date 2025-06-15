import { useDispatch} from "react-redux";

import { useState } from "react";
import { addMovie } from "../store/slices/peliculasSlice";

const CreateMovie = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");

    const dispatch = useDispatch();

    return(
        <div>
            <h1>Crear Película/Serie</h1>
            <div>
                <input type="text" placeholder="Marvel, Star Wars..." value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Género/categoría" value={gender} onChange={(e) => setGender(e.target.value)}/>
                <button onClick={() => dispatch(addMovie({
                    id: Date.now(),
                    name: name,
                    gender: gender,
                }))}>Agregar</button>
            </div>
        </div>
    )
}

export default CreateMovie;