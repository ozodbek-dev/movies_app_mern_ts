import express from 'express'
import {body} from "express-validator"
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import UserModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router({mergeParams:true});

router
    .route("/signup")
    .post(
    body("username")
        .exists()
        .withMessage("username is required")
        .isLength({min:8})
        .withMessage("username minimum 8 characters ")
        .custom(async value=>{
            const user = await UserModel.findOne({username:value});
            if(user) return Promise.reject("username already used")}
        ),
        body("password")
            .exists()
            .withMessage("password is required")
            .isLength({min:8})
            .withMessage("username minimum 8 characters"),
    body("confirmPassword")
        .exists()
        .withMessage("confirmPassword is required")
        .isLength({min:8})
        .withMessage("confirmPassword minimum 8 characters")
        .custom((value, {req})=>{
            if(value !== req.body.password) throw new Error("confirmPassword not match")
        }),
    body("displayName")
        .exists()
        .withMessage("displayName is required")
        .isLength({min:8})
        .withMessage("displayname minimum 8 characters"),

    requestHandler.validate,
    userController.signup
);

router.route("/update-password").put(tokenMiddleware.auth,
    body("password")
        .exists()
        .withMessage("password is required")
        .isLength({min:8})
        .withMessage("password minimum 8 characters"),
    body("newPassword")
        .exists()
        .withMessage("newPassword is required")
        .isLength({min:8})
        .withMessage("newPassword minimum 8 characters")
        .custom((value, {req})=>{
            if(value !== req.body.newPassword) throw new Error("confirmPassword not match")
        }),
    requestHandler.validate,
    userController.updatePassword
);

router.route("/info")
    .get(tokenMiddleware.auth, userController.getInfo)

router.route("/favorites")
    .get(tokenMiddleware.auth,favoriteController.getFavoritesOfUser)

router.route('/favorites')
    .post(
        tokenMiddleware.auth,
        body("mediaType")
            .exists().withMessage("newPassword is required")
            .custom(type=>
                ["movie", 'tv']
                .includes(type)
            )
            .withMessage("mediaType invalid"),
        body("mediaId")
            .exists().withMessage("mediaType is required")
            .isLength({min:1})
            .withMessage("mediaId can not be empty"),
        body("mediaTitle")
            .exists().withMessage("mediaTitle is required"),
        body("mediaPoster")
            .exists().withMessage("mediaPoster is required"),
        body("mediaRate")
            .exists().withMessage("mediaRate is required"),
        requestHandler.validate,
        favoriteController.addFavorite,
    )
router.route('/favorite/:favoriteId')
    .delete(tokenMiddleware.auth,favoriteController.removeFavorite)
export  default  router;