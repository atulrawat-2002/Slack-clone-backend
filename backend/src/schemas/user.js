import bcrypt from "bcrypt";
import mongoose from "mongoose";
import uuid4 from "uuid4";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exist'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'
        ],

    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'username already exists'],
                 match: [
            /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
            'Please fill a valid username'
        ]
    },
    avatar: {
        type: String,

    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiry: {
        type: Date
    }
}, {timestamps: true});


userSchema.pre('save', async function saveUser(next) {

    if(this.isNew) {
        const user = this;
        const SALT = bcrypt.genSaltSync(9);
        const hashedPassword = bcrypt.hashSync(user.password, SALT);
        user.password = hashedPassword;
        user.avatar = `https://robohash.org/${user.username}`;
        user.verificationToken = uuid4().substring(0, 10).toUpperCase();
        user.verificationTokenExpiry = Date.now() + 3600000; // 1 hour
        // next();
    }
    
})


const User = mongoose.model('User', userSchema);


export default User;