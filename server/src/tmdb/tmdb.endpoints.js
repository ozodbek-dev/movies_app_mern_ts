import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
    mediaList:({mediaType, MediaCategory,page})=>tmdbConfig.getUrl(`${mediaType}/${MediaCategory}`, page),
    mediaDetail:({mediaType,mediaId})=> tmdbConfig.getUrl(`${mediaType}/${mediaId}`),
    mediaGenres:({mediaType})=>tmdbConfig.getUrl(`genre/${mediaType}/list`),
    mediaCredits:({mediaType,mediaId})=> tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
    mediaVideos:({mediaType,mediaId})=> tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
    mediaRecommended:({mediaType,mediaId})=> tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
    mediaImages:({mediaType,mediaId})=> tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),
    mediaSearch:({mediaType,query,page})=> tmdbConfig.getUrl(`search/${mediaType}`,{query,page}),
    personDetail : ({personId})=>tmdbConfig.getUrl(`person/${personId}`),
    personMedias : ({personId})=>tmdbConfig.getUrl(`person/${personId}/combined_credits`)
}

export default  tmdbEndpoints;