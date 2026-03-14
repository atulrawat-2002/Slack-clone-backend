import '../processors/mailProcessors.js';
import mailQueue from "../queues/mailQueue.js"

export const addMailToMailQueue = async (mailData) => {
    console.log('Mail producer')
    try {
        await mailQueue.add(mailData);
        console.log('Mail added to the mail queue')
    } catch (error) {
        
    }
}