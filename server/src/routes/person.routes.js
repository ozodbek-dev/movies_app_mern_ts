import {Router} from "express";
import personController from "../controllers/person.controller.js";

const router = Router({mergeParams:true});

router.get("/:personId/medias",personController.personMedias)
router.get("/:personId", personController.personDetail)
export  default  router;