import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import MoviesList from "./MoviesList";
const MoviesContainer = () => {
    const movies = useSelector((state: RootState) => state.peliculas.peliculas);
    return(
        // Mapeamos la lista de peliculas y la pasamos por props
        (movies.map((movie) => (
            <MoviesList key={movie.id} movie={movie} />
        )))
    )
}

export default MoviesContainer;