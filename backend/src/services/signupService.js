import { ENABLE_EMAIL_VARIFICATION } from "../configs/serverConfigs.js";
import { addMailToMailQueue } from "../producers/mailQueueProducer.js";
import userRepository from "../repositories/userRepository.js";
import { verificationEmail } from "../utils/mailObject.js";
import { customErrorResponse } from "../utils/responseObjects.js";

export async function signupService(data) {
    try {

        const newUser = await userRepository.signUpUser(data);
        if(ENABLE_EMAIL_VARIFICATION) {
            addMailToMailQueue({
                ...verificationEmail(newUser.verificationToken),
                to: newUser.email,
            })
        }

        return newUser;
    } catch (error) {
        console.log(error.message)
        throw customErrorResponse(error)
    }
}

export const verifyTokenService = async (token) => {
    try {
        
        const user = await userRepository.getByToken(token);

        if( !user ) {
            throw customErrorResponse({ message: 'Invalid token!' })
        } 

        if( user.verificationTokenExpiry < Date.now() ) {
            throw customErrorResponse({ message: 'token expired!' })
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;
        await user.save();
        
        return user;

    } catch (error) {
        console.log('Error in token verification service', error.message)
        throw customErrorResponse(error)
    }
}