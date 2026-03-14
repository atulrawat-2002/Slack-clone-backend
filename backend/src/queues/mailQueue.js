import Queue from "bull";
import redisConfig from "../configs/redisConfig.js";


export default new Queue('mailQueue', {
    redis: redisConfig
})