import { useState} from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store/store";
import {  deletePelicula, updatePelicula } from "../store/slices/peliculasSlice";

import Modal from "./ModalEdit";
import {motion, AnimatePresence} from "framer-motion";
type Movie = {
    id: string;
    name: string;
    gender: string;
}

const MoviesList = ({movie}: {movie: Movie}) => {
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState<string | null>(null);
    const [editGender, setEditGender] = useState<string | null>(null);
    const [modal, setModal] =useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    return(
            <div className="movie-list">
                <div className="list-info">
                    <h2>{movie.name}</h2>
                    <p>{movie.gender}</p>
                </div>
                <div className="list-btn">
                    <button onClick={() => {
                        setEditId(movie.id);
                        setEditName(movie.name);
                        setEditGender(movie.gender);
                        setModal(true);
                    }}>Editar</button>
                    <button onClick={() => dispatch(deletePelicula(movie.id))}>Eliminar</button>
                </div>
                <AnimatePresence>
                {modal && (
                            <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            >
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
                                    setEditId(null);
                                    setEditName(null);
                                    setEditGender(null);
                                    }
                                }}
                                />
                            </motion.div>
                )}
                </AnimatePresence>
            </div>
    )
}

export default MoviesList;