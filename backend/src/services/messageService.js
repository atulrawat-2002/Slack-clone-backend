import channelRepository from "../repositories/channleRepository.js";
import messsageRepository from "../repositories/messageRepository.js"
import { isUserMemberOfWorkSpace } from "./workSpaceService.js";

export const getPaginatedMessagesService = async(messageParams, page, limit, user) => {

    try {

        const channelDetails = await channelRepository.getChannelWithWorkSpaceDetails(messageParams.workSpaceId);

        const workSpace = channelDetails.workSpaceId;

        const isMember = isUserMemberOfWorkSpace(workSpace, user);

        if(!isMember) {
            throw Error('User is not part of the member')
        }

        const message = await messsageRepository.getPaginatedMessages(messageParams, page, limit);
        return message;

    } catch (error) {
        console.log('Error in getPaginatedMessagesService', error.message);
        throw error;
    }    

}

export const createMessageService = async (message) => {

    const newMessage = await messsageRepository.create(message);
    return newMessage;

}