// import { useState, useEffect } from 'react'
import { MovieModel } from '../component-model/movie'

// 受け取る props の型を定義
interface MovieListProps {
 movies: [];
 title: string;
}

const MovieList = (
    props: MovieListProps,
) => {
    return (
    <>
        <h1 className="text-4xl text-black text-center font-semibold">{`${props.title}一覧`}</h1>
          <div className="group m-10 p-10 border hover:bg-gray-100">        
            <div className="grid gap-4 grid-cols-5">
              { props.movies.map((movie: MovieModel) =>  {
                return <>
                  <div className="">
                    <img className="shadow-md hover:opacity-50" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="映画ポスター"></img>
                    <h3>{movie.title}</h3>
                  </div>
                </>
              }) }
            </div>
          </div>
    </>
    ) 
}


export default MovieList;