import { meta } from "@eslint/js";
import {useState,useEffect} from "react";
import Popup from "./Popup";

export default function App(){
    
    const defaultMovies = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=de-DE&region=DE&release_date.gte=2016-11-16&release_date.lte=2016-12-02&with_release_type=2|3`);
            const data = await res.json();
            setMovies(data.results);
            console.log('working')
        } catch (err) {
            console.error(err);
        }
    };

useEffect(()=>{
    defaultMovies();
},[])


    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);


    const [openPopup,setPopup] = useState({value: false, movie: {}})

    
    
    const searchMovies = async (e) => {
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    
    function cardClick(clickedMovie){
        console.log("clicked")
        setPopup({value: !openPopup.value, movie: clickedMovie })
        
    }


    return (
        <>
        {openPopup.value ? <Popup selectCard={cardClick} selectedMovie={openPopup.movie}/> : null}
        <div className="flex flex-col mx-auto justify-center items-center gap-12 bg-emerald-950 py-20">
        <h1 className="font-bold text-5xl text-white">Movie Search</h1>
        
            <form className="flex flex-row flex-wrap justify-center items-center gap-4 w-full px-40" onSubmit={searchMovies}>
                
                <input className="border-2 rounded-full place-content-center py-2 px-6 w-6/12 focus:border-black" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="rounded-full border-solid border-2 px-8 py-2 hover:bg-black text-white " type="submit">Search</button>
            </form>
            <div className=" ">
            <div className="flex flex-wrap gap-4 flex-wrap justify-center">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    
                    <div className="bg-emerald-900 my-2 shadow-lg w-60 h-full rounded-lg hover:shadow-xl overflow-auto ease-in duration-200 hover:mt-1 hover:shadow-lg hover:cursor-pointer" key={movie.id} onClick={()=>cardClick(movie)}>
                        <img className="w-full h-60 object-cover object-center rounded-tl-lg rounded-tr-lg"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                            />
                        <div className="mx-auto items-center flex flex-col gap-2 p-5">
                        <h3 className="text-white text-lg font-bold text-center line-clamp-1">{movie.title}</h3>
                        <p className="text-sm text-slate-200 font-medium">RELEASE DATE: {movie.release_date}</p>
                        <p className="text-sm font-semibold text-yellow-400">RATING: {movie.vote_average}</p>
                        
                        </div>

                    </div>
                    
                ))}
            </div>   
            </div>
            </div> 
        </>
    )
}