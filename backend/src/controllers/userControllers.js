import { StatusCodes } from "http-status-codes";

import { signupService } from "../services/signupService.js";
import { customErrorResponse, successResponse } from "../utils/responseObjects.js";
import { signinService } from "../services/signinService.js";

export const signupController = async (req, res) => {

    try {

        const user = await signupService(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(user, 'User Created Successfully'))
        return;
    } catch (error) {
            console.log("Custom Error signup controller ", error);
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse(error));
    }

}


export const signinController = async(req, res) => {

    try {
        const response = await signinService(req.body);
        res.status(StatusCodes.OK).json(successResponse(response, 'User signed in successfully'));
        return;
    } catch (error) {
        console.log("error in sign in controller", error.message);
        return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse(error))
    }   

}