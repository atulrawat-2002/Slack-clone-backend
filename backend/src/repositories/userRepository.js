import User from '../schemas/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),
  
  signUpUser: async function (data) {
    const newUser = new User(data);
    await newUser.save();
    return newUser;
  },

  getUserByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  getUserByName: async function (name) {
    const user = await User.findOne({ username: name }).select('-password');
    return user;
  },
  getByToken: async function( token ) {
    const user = await User.findOne({ verificationToken: token });
    return user;
  }
};


export default userRepository;
