import Message from "../schemas/message.js";
import crudRepository from "./crudRepository.js";


const messsageRepository = {
    ...crudRepository(Message),
    getPaginatedMessages: async function (messageParams, page, limit){
        const message = await Message.find(messageParams)
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('senderId', 'username email avatar');


        return message;
    }
}

export default messsageRepository;