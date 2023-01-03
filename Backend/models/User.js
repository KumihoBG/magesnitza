const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        isEmail: {
            bail: true,
        },
    },
    hashedPassword: {
        type: String,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        possibleValues: ['user','admin'],
    },
});

module.exports = model('User', userSchema);