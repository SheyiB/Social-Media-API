const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        trim: true
    },
    lastname : {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,

    },
    authenticated: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    }

})

userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
     })
}

module.exports = mongoose.model('User', userSchema)