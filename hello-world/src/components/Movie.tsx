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

  const [pageNumber, setPageNumber] = useState<number>(0); // 表示するページ
  const [totalpages, setTotalPages] = useState<number>(1); // 合計のページ数

  // pagenation
  // TODO: pagenation の実装
  // const [pageCount, setPageCount] = useState<number>(1);
  
  // API document
  // https://www.themoviedb.org/documentation/api
  const apiKey = "3b4d3a3f620713714120649bf57a2d7f";
  const language = "ja";

  // 人気映画一覧情報
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${pageNumber + 1}`)
      .then(res => {
        const movies = res.data.results;        
        setPopMovies(movies);
        setTotalPages(res.data.total_pages);
      })
    }, [pageNumber])

    // pagenation 時に発火する関数
    const handlePageClick = (data: any)  => {
      setPageNumber(data['selected']);
      console.log(data['selected']);
      
      // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    }

    // 映画検索api
    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${expression}&page=${pageNumber + 1}`)
        .then(res => {
          setSerchMovies(res.data.results);
          setTotalPages(res.data.total_pages);
          console.log(res.data);
          
        })
      }, [pageNumber, expression])

    // 映画検索api
    const onSubmit: SubmitHandler<Inputs> = (
      data
    ) => {
      setExpression(data.name);
    }

  if (expression !== '') {
    return (
      <div>
        <div className="container mx-auto">
          <h1 className="text-4xl text-green-700 text-center font-semibold">Movie</h1>
          <div className="flow-root">
            <div className="my-4 block text-center px-4 py-2">
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input 
                  type="text"
                  placeholder='映画・キャスト検索'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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
          <div className="flex justify-center my-8">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={totalpages} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={'flex-1 flex justify-center rounded-md shadow-sm '} // ページネーションであるulに着くクラス名
              pageClassName={'text-2xl bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-semibold'}
              breakClassName={'text-2xl relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'}
              activeClassName={'text-2xl z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'} // アクティブなページのliに着くクラス名
              previousClassName={'text-2xl relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'} // 「<」のliに着けるクラス名
              nextClassName={'text-2xl relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'} // 「>」のliに着けるクラス名
              // TODO: 使用不可のクラス付与
              // disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
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
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input 
                  type="text"
                  placeholder='映画・キャスト検索'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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
          <div className="flex justify-center my-8">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={totalpages} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={'flex-1 flex justify-center rounded-md shadow-sm '} // ページネーションであるulに着くクラス名
              pageClassName={'text-2xl bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-semibold'}
              breakClassName={'text-2xl relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'}
              activeClassName={'text-2xl z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'} // アクティブなページのliに着くクラス名
              previousClassName={'text-2xl relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'} // 「<」のliに着けるクラス名
              nextClassName={'text-2xl relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'} // 「>」のliに着けるクラス名
              // TODO: 使用不可のクラス付与
              // disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
            />
          </div>
        </div>
      </div>
  )
}

export default Movie;