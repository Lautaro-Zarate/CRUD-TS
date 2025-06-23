import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// import { addMovie } from "../store/slices/peliculasSlice";
import { addPelicula, fetchPeliculas } from "../store/slices/peliculasSlice";
import type { AppDispatch } from "../store/store";

type FormData = {
    name: string;
    gender: string;
}

const CreateMovie = () => {
    const { register, handleSubmit, formState:{errors}, reset } = useForm<FormData>();
    // const [name, setName] = useState("");
    // const [gender, setGender] = useState("");

    const dispatch = useDispatch<AppDispatch>();

        useEffect(() => {
        dispatch(fetchPeliculas())
    }, [dispatch])

    const onSubmit = (data: FormData) => {
        dispatch(addPelicula(data));
        reset();
    }

    return(
        <section className="create-movie-container">
            <div className="create-movie-absolute">
                <h1>Crear Película</h1>
                <form className="create-movie-inputs" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", {required: true, minLength: 2})} type="text" placeholder="Marvel, Star Wars..." />
                    {errors.name?.type === "required" && <span className="error-message-input">Debe poner el nombre de la película</span>}
                    {errors.name?.type === "minLength" && <span className="error-message-input">La película debe tener más de 2 caracteres</span>}
                    <input {...register("gender", {required: true, minLength: 4})} type="text" placeholder="Género/categoría" />
                    {errors.gender?.type === "required" && <span className="error-message-input">Debe poner el género de la película</span>}
                    {errors.gender?.type === "minLength" && <span className="error-message-input">El género debe tener más de 3 caracteres</span>}
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </section>
    )
}

export default CreateMovie;