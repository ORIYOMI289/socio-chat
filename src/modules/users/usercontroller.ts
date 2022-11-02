import { Request, Response } from "express";

import { responsehandler } from "../../utils/helpers";
import { 
    createUserService, 
    loginUserService 
} from "./userService";
import { upload } from "../../middlewares/custom";
import { IRequest } from "../../helpers/custom.types";


export async function createUserController(req: Request, res:Response) {
    try{
        const response =await createUserService(req.body)

        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function loginUserController(req: Request, res:Response) {
    try{
        const response =await loginUserService(req.body)
        
        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}


