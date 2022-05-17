const bycrypt = require('bcryptjs')
const UserSchema = require("../models/UserSchema")
const jwt = require('jsonwebtoken')
const { LOGIN_SUCCESS, USER_PASSWORD_INCORRECT, USER_NOT_FOUND } = require("../constants")
const onSignIn = async ({ username, password }) => {

    const user = await UserSchema.findOne({ email: username })
    if (!user) {
        return {
            success: false,
            message: USER_NOT_FOUND
        }
    }
    const isMatch = await bycrypt.compare(password, user.password)
    if (!isMatch) {
        return {
            success: false,
            message: USER_PASSWORD_INCORRECT
        }

    }
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
    });
    return {
        success: true,
        message: LOGIN_SUCCESS,
        user: {
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email, 
            phoneNumber: user.phoneNumber,
            token: token
        }
    }
}
const onSignUp = (user) => {
    return {
        firstName: "worked",
        lastName: "worked",
        age: 11,
    }
}
const onResetPassword = (user) => {
    return {
        firstName: "worked",
        lastName: "worked",
        age: 11,
    }
}

const onForgetPassword = (user) => {
    return {
        firstName: "worked",
        lastName: "worked",
        age: 11,
    }
}

const onVerifyOTP = (user) => {
    return {
        firstName: "worked",
        lastName: "worked",
        age: 11,
    }
}


module.exports = {
    onSignIn,
    onSignUp,
    onResetPassword,
    onForgetPassword,
    onVerifyOTP
};
