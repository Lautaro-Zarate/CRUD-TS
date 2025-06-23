import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import MoviesList from "./MoviesList";
const MoviesContainer = () => {
    const movies = useSelector((state: RootState) => state.peliculas.peliculas);
return (
        <section className="movies-container">
            {movies.map((movie) => (
                <article key={movie.id} className="movie-list-container">
                    <MoviesList movie={movie}/>
                </article>
            ))}
        </section>
)}

export default MoviesContainer;