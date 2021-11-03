// import { useState, useEffect } from 'react'

// 受け取る props の型を定義
interface MovieListProps {
 movies: [];
}

const MovieList = (
    props: MovieListProps,
) => {
    return <div>console.log(props.movies)</div>  
}


export default MovieList;