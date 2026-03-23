import { APP_LINK, MAIL_ADDRESS } from "../configs/serverConfigs.js";

export default function workSpaceJoinMale (workSpace) {
    return {
        from: MAIL_ADDRESS,
        subject: 'You have been added to a work space',
        text: `Congratulations! You have been added to this ${workSpace.name} work space`
    }
}


export const verificationEmail = (verificationToken) => {
    return {
        from: MAIL_ADDRESS,
        subject: 'Welcome to platform, please verify your email',
        text: `
                Please verify your email by clicking on the link below: 
                ${APP_LINK}/verify/${verificationToken}
        `
    }
}