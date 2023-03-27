export enum mediaType {
    movie='movie',
    tv="tv"
}

export enum mediaCategory {
    popular="popular",
    top_rated="top_rated"
}
const backdropPath = (imgEndpoint:string):string=>`https://image.tmdb.org/t/p/original${imgEndpoint}`
const posterPath = (imgEndpoint:string):string=>`https://image.tmdb.org/t/p/w500${imgEndpoint}`
const youtubePath = (videoId:string):string=>`https://www.youtube.com/embed/${videoId}?controls=0`

export default {
    backdropPath,
    posterPath,
    youtubePath
}