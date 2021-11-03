export interface MovieModel {
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