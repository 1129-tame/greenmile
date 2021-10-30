import { useState, useEffect } from 'react'

function Movie() {

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

  const [movie, setMovie] = useState<MovieModel>();
  const [movies, setMovies] = useState<[]>([]);
  const apiKey = "3b4d3a3f620713714120649bf57a2d7f";
  const language = "ja";

  // // 映画サンプル情報の取得
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}&language=${language}`, {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        setMovie(data);
    })
  },[])

  // 人気映画一覧情報
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}`, {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.results);
        setMovies(data.results);
    })
  },[])

  return (
      <div>
        <div className="container mx-auto">
          <h1 className="text-4xl text-green-700 text-center font-semibold">Hello Tailwind</h1>
          <input type="text" />
          <button className="bg-indigo-700 font-semibold text-white py-2 px-4 rounded hover:bg-red-500 focus:outline-none focus:shadow-outline duration-1000">検索</button>
          <h1 className="text-4xl text-black text-center font-semibold">人気映画一覧</h1>
          <div className="group m-10 p-10 border hover:bg-gray-100">
          {/* <p className="font-black group-hover:text-red-900">New Project</p>
          <p className="font-black group-hover:text-blue-900">Next Project</p> */}
        
          <div className="grid gap-4 grid-cols-5">
            { movies.map((movie: MovieModel) =>  {
              return <>
                <div className="">
                  <img className="shadow-md" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="映画ポスター"></img>
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