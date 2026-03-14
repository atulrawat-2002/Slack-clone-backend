import { JOIN_CHANNLE } from "../utils/eventConstants.js"

export const channelSocketHandlers = (io, socket ) => {

    socket.on(JOIN_CHANNLE, async function joinChannelHandler(data, cb ) {
        const roomId = data.channelId;
        socket.join(roomId);
        console.log(`${socket.id} has joined ${roomId} channel`)
        cb({
            success: true,
            message: 'Joined the channel',
            data: roomId
        })
    })

}