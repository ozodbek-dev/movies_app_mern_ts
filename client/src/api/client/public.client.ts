
import  querystring from "query-string";
import axios from "axios";

const baseURL:string = "127.0.0.1:4000/api/v1/"

const publicClient = axios.create({
    baseURL,
    paramsSerializer:{
        encode:params=>querystring.stringify(params)
    }
})

publicClient.interceptors.request.use( function (config):any {
    console.log(config)
    return {
        ...config,
        headers:{
            "Content-Type":"application/json",
        }
    }
})

publicClient.interceptors.request.use(  function (response){
    if(response && response.data) return response.data;
    console.log(response)
    return response;
}, (err)=>{
    if(err) throw err.response.data
})

export default  publicClient