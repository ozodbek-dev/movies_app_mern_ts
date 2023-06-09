import {validationResult} from "express-validator"
const responseWithData = (res,statusCode, data)=> res.status(statusCode).json(data);

const error = (res)=>responseWithData(res, 500,{
        status:500,
        message:"Opps, Something went wrong!"
})

const badRequest = (res,msg)=>responseWithData(res,400,{
    status:400,
    message:msg
})

const ok = (res, data)=>responseWithData(res, 200,data)

const created = (res, data)=>responseWithData(res, 201, data);

const unAuthorize = (res)=>responseWithData(res, 401, {
    status:401,
    message:"unathorized"
});

const notFound = (res)=>responseWithData(res, 404,{
    status:404,
    message:"Resource Not found"
})

export default {
    error,
    ok,
    created,
    badRequest,
    responseWithData,
    notFound,
    unAuthorize
}
