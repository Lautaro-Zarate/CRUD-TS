import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";

import MoviesList from "./MoviesList";
const MoviesContainer = () => {
    const movies = useSelector((state: RootState) => state.peliculas.peliculas);
return (
        <section className="movies-container">
        <AnimatePresence>
        {movies.length === 0 ? (
            <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-movies"
            >
            No hay películas cargadas
            </motion.p>
        ) : (
            movies.map((movie) => (
            <motion.article 
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="movie-list-container"
            >
                <MoviesList movie={movie} />
            </motion.article>
            ))
        )}
        </AnimatePresence>
        </section>
)}

export default MoviesContainer;