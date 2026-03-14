import userRepository from "../repositories/userRepository.js";
import workSpaceRepository from "../repositories/workSpaceRepository.js";
import { isUserMemberOfWorkSpace } from "./workSpaceService.js";

export const isMemeberPartOfWorkSpaceService = async (workSpaceId, userId) => {
    try {

        const workSpace = await workSpaceRepository.getById(workSpaceId);

        if(!workSpace) {
            throw new Error('workspace spcecified workspace does not exist'); 
        }

        const isUserMember = isUserMemberOfWorkSpace(workSpace, userId);

        if(!isUserMember) {
            throw new Error('User is not member of workspace');
        }

        const member = await userRepository.getById(userId);

        return member;
        
    } catch (error) {
        console.log('is user part of work space service error', error.message);
        throw new Error(error);
    }
}