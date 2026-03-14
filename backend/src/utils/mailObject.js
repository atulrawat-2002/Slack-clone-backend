import { MAIL_ADDRESS } from "../configs/serverConfigs.js";

export default function workSpaceJoinMale (workSpace) {
    return {
        from: MAIL_ADDRESS,
        subject: 'You have been added to a work space',
        text: `Congratulations! You have been added to this ${workSpace.name} work space`
    }
}