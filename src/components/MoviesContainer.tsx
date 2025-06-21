import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import MoviesList from "./MoviesList";
const MoviesContainer = () => {
    const movies = useSelector((state: RootState) => state.peliculas.peliculas);
return (
        <div>
            {movies.map((movie) => (
            <MoviesList key={movie.id} movie={movie} />
            ))}
        </div>
)}

export default MoviesContainer;