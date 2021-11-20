import { useState, useEffect } from 'react'
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';
interface Inputs {
  name: string,
}

function Movie() {
  // const [movie, setMovie] = useState<MovieModel>();
  const { register, handleSubmit } = useForm();
  const [popMovies, setPopMovies] = useState<[]>([]); // 人気映画
  const [serchMovies, setSerchMovies] = useState<[]>([]); // 検索した映画
  const [expression, setExpression] = useState<string>(''); // 検索したワード
  const [pageNumber, setPageNumber] = useState<number>(1);

  // pagenation
  // TODO: pagenation の実装
  const [pageCount, setPageCount] = useState<number>(1);
  
  // API document
  // https://www.themoviedb.org/documentation/api
  const apiKey = "3b4d3a3f620713714120649bf57a2d7f";
  const language = "ja";

  // 人気映画一覧情報
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${pageNumber}`)
      .then(res => {
        const movies = res.data.results;        
        setPopMovies(movies);
      })
    }, [])

    const handlePageClick = () => {
      // data: {selected: number}
      // ) => {
      // setPageNumber(data['selected']);
      // return pageNumber;
    }

    // 映画検索api
    const onSubmit: SubmitHandler<Inputs> = (
      data
    ) => {
      const serchName = data.name
      
      setExpression(serchName);
      async function feachData() {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${serchName}&page=${pageNumber}`)
        
        setSerchMovies(res.data.results);
        // setPageCount(res.page);
      }
      feachData();
    }

  if (expression !== '') {
    return (
      <div>
        <div className="container mx-auto">
          <h1 className="text-4xl text-green-700 text-center font-semibold">Movie</h1>
          <div className="flow-root">
            <div className="my-4 block text-center px-4 py-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                  type="text"
                  placeholder='映画・キャスト検索'
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
          <div className="text-4xl text-green-700 text-center font-semibold">
            <ReactPaginate
              pageCount={5} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
            />
          </div>
          
        </div>
      </div>
    );
  }

  return (
      <div>
        <div className="container mx-auto">
          <h1 className="text-4xl text-green-700 text-center font-semibold">Movie</h1>
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