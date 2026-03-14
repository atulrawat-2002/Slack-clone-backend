import { StatusCodes } from "http-status-codes";
import { isMemeberPartOfWorkSpaceService } from "../services/memberService.js";
import { customErrorResponse, successResponse } from "../utils/responseObjects.js";

export const isUserMemberOfWorkSpaceController = async (req, res) => {
    try {
        
        const response = await isMemeberPartOfWorkSpaceService(req.params.workSpaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(response, 'User is a member of workspace'))

    } catch (error) {
        console.log('is user member of workspace controller error', error.message);
        return res.status(StatusCodes.OK).json(customErrorResponse(error))
    }
}