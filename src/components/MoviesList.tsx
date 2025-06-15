type Movie = {
    id: number;
    name: string;
    gender: string;
}

const MoviesList = ({movie}: {movie: Movie}) => {
    return(
        <div>
            <h2>{movie.name}</h2>
            <p>{movie.gender}</p>
        </div>
    )
}

export default MoviesList;