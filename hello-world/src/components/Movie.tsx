import { useState, useEffect } from 'react'
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";

interface MovieModel {
  adult: boolean,
  backdrop_path: string | null,
  belongs_to_collection: null | object,
  budget: number,
  genres: [],
  homepage: string | null,
  id: number,
  imdb_id: string | null, // minLength: 9 maxLength: 9// pattern: ^tt[0-9]{7}
  original_language: string,
  original_title: string,
  overview: string | null
  popularity: number
  poster_path: string | null,
  production_companies: [], //array[object]
  production_countries: [], //array[object]
  release_date: string, // format: date
  revenue: number,
  runtime: number | null,
  spoken_languages: [], //array[object]
  status: string, // Allowed Values: Rumored, Planned, In Production, Post Production, Released, Canceled
  tagline: string | null
  title: string,
  video: boolean,
  vote_average: number
  vote_count: number,
}

interface Inputs {
  name: string,
}

function Movie() {
  // const [movie, setMovie] = useState<MovieModel>();
  const { register, handleSubmit } = useForm();
  const [popMovies, setPopMovies] = useState<[]>([]);
  const [serchMovies, setSerchMovies] = useState<[]>([]);
  const [expression, setExpression] = useState<string>();
  const onSubmit: SubmitHandler<Inputs> = data => setExpression(data.name);
  const apiKey = "3b4d3a3f620713714120649bf57a2d7f";
  const language = "ja";

  // 人気映画一覧情報
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}`)
      .then(res => {
        const movies = res.data.results;
        console.log(movies);
        
        setPopMovies(movies);
      })
    }, [])

    // GET /{lang?}/API/Search/{apiKey}/{expression}
    // 映画検索api
    useEffect(() => {
      async function feachData() {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${expression}`)
        setSerchMovies(res.data.results);
        console.log(serchMovies);
      }
      feachData()
      // axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${expression}`)
      //   .then(res => {
      //     setSerchMovies(res.data.results);
      //     console.log(serchMovies);
      //   })
    }, [expression])

  return (
      <div>
        <div className="container mx-auto">
          <h1 className="text-4xl text-green-700 text-center font-semibold">Want Movie!</h1>
          <div className="flow-root">
            <div className="my-4 block text-center px-4 py-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                  type="text"
                  className="w-4/5 h-6 p-3 rounded-lg border-black-dotted" 
                  {...register("name")}
                />
                <button type="submit" className="bg-indigo-700 font-semibold text-white py-2 px-4 rounded hover:bg-red-500 focus:outline-none focus:shadow-outline duration-1000 m-2">検索</button>
              </form>
            </div>
          </div>
          <h1 className="text-4xl text-black text-center font-semibold">人気映画一覧</h1>
          <div className="group m-10 p-10 border hover:bg-gray-100">        
            <div className="grid gap-4 grid-cols-5">
              { popMovies.map((movie: MovieModel) =>  {
                return <>
                  <div className="">
                    <img className="shadow-md hover:opacity-50" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="映画ポスター"></img>
                    <h3>{movie.title}</h3>
                  </div>
                </>
              }) }
            </div>
          </div>  

          <div className="min-h-screen flex justify-center items-center">
            Weather Application
          </div>
        </div>
      </div>
      
  )
}

export default Movie;