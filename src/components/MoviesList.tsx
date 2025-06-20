import { useState} from "react";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import {  deletePelicula, updatePelicula } from "../store/slices/peliculasSlice";

import Modal from "./ModalEdit";

type Movie = {
    id: number;
    name: string;
    gender: string;
}

const MoviesList = ({movie}: {movie: Movie}) => {
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string | null>(null);
    const [editGender, setEditGender] = useState<string | null>(null);
    const [modal, setModal] =useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    return(
        <div>
            <h2>{movie.name}</h2>
            <p>{movie.gender}</p>
            <div>
                <button onClick={() => dispatch(deletePelicula(movie.id))}>Eliminar</button>
                <button onClick={() => {
                    setEditId(movie.id);
                    setEditName(movie.name);
                    setEditGender(movie.gender);
                    setModal(true);
                }}>Editar</button>
            </div>
            {modal && (
                <Modal
                editId={editId}
                editName={editName}
                editGender={editGender}
                setEditName={setEditName}
                setEditGender={setEditGender}
                setModal={setModal}
                // 👉🏼 Ejecuta la función desde el padre
                onAccept={() => {
                    if (editId !== null && editName && editGender) {
                    dispatch(updatePelicula({ id: editId, name: editName, gender: editGender }));
                    }
                }}
                />
            )}
        </div>
    )
}

export default MoviesList;