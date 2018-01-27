import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    userName: String,
    companyName: String,
    isAdmin: Boolean,
    isActive: Boolean
});

module.exports = mongoose.model('Users',userSchema);