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
  const [movies, setMovies] = useState<any>();
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
          <h2>{movie?.original_title}</h2>
          <h2>人気映画一覧</h2>
          <ul>{ movies.map((movie: MovieModel) =>  {return <div>{movie.original_title}</div>}) }</ul>
          { console.log(movies) }
      </div>
      
  )
}

export default Movie;