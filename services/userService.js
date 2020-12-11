const User = require('../models/userModel');

module.exports.createUser = async newUser => {
    return await User.create(newUser);
};

module.exports.getUserById = async uid => {
    return await User.findById(uid);
};
