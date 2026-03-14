import mailQueue from "../queues/mailQueue.js";
import mailer from "../configs/mailerConfig.js"

mailQueue.process(async (job) => {
    const  mailData = job.data;
    console.log(`Processing mail for ${mailData}`);

    try {
        
        const response = await mailer.sendMail(mailData);
        console.log('Mail sent to ', mailData);

    } catch (error) {
        console.log('Error inside mail Processor', error.message);
        throw new Error(error);
    }

})