import channelRepository from "../repositories/channleRepository.js";
import messsageRepository from "../repositories/messageRepository.js"
import { isUserMemberOfWorkSpace } from "./workSpaceService.js";
import { v2 as cloudinary } from 'cloudinary'

export const getPaginatedMessagesService = async(messageParams, page, limit, user) => {

    try {

        const channelDetails = await channelRepository.getChannelWithWorkSpaceDetails(messageParams.channelId);

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
    try {

        if(message.image) {
            const cloudImage = await cloudinary.uploader.upload(message.image, {
                folder: "slack-chat-media"
            }) 

            message = {
                ...message,
                image: {
                    publicId: cloudImage.public_id,
                    url: cloudImage.url
                }
            }
        }

        const newMessage = await messsageRepository.create(message);
        return newMessage;
    } catch (error) {
        console.log('Error in create message service', error.message);
        throw error;
    } 

}