import { useState, useEffect } from 'react'
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import MovieList from './MovieList'
interface Inputs {
  name: string,
}

function Movie() {
  // const [movie, setMovie] = useState<MovieModel>();
  const { register, handleSubmit } = useForm();
  const [popMovies, setPopMovies] = useState<[]>([]);
  const [serchMovies, setSerchMovies] = useState<[]>([]);
  const [expression, setExpression] = useState<string>('');
  
  const apiKey = "3b4d3a3f620713714120649bf57a2d7f";
  const language = "ja";

  // 人気映画一覧情報
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}`)
      .then(res => {
        const movies = res.data.results;        
        setPopMovies(movies);
      })
    }, [])

    // 映画検索api
    const onSubmit: SubmitHandler<Inputs> = (
      data
    ) => {
      const serchName = data.name
      
      setExpression(serchName);
      async function feachData() {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${serchName}`)
        
        setSerchMovies(res.data.results);
      }
      feachData();
    }

  if (expression !== '') {
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
          <MovieList
            movies={serchMovies}
            title='検索結果'
          />
        </div>
      </div>
    );
  }

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
          <MovieList
            movies={popMovies}
            title='人気映画'
          />
        </div>
      </div>
  )
}

export default Movie;