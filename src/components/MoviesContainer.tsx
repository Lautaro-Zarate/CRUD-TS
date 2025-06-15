import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import MoviesList from "./MoviesList";
const MoviesContainer = () => {
    const movies = useSelector((state: RootState) => state.peliculas.peliculas);
    movies.forEach((movie) => (
        <div>
            <h2>{movie.name}</h2>
            <p>{movie.gender}</p>
            <p>{movie.id}</p>
        </div>
    ))
    return(
        (movies.map((movie) => (
            <MoviesList key={movie.id} movie={movie} />
        )))
    )
}

export default MoviesContainer;