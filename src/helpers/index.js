const bycrypt = require('bcryptjs')
const UserSchema = require("../models/UserSchema")
const jwt = require('jsonwebtoken')
const { LOGIN_SUCCESS, USER_PASSWORD_INCORRECT, USER_NOT_FOUND, USER_EXIST, USER_CREATED, USER_ERROR, USER_UPDATED } = require("../constants")
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
const onSignUp = async ({ firstName, lastName, phoneNumber, email, password }) => {
    const UserAlreadyExist = await UserSchema.findOne({ email: email })
    if (UserAlreadyExist) {
        return {
            success: false,
            message: USER_EXIST
        }
    }
    else {
        const encryptedPassword = await bycrypt.hash(password, 10)
        const user = new UserSchema({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber.toString(),
            email: email,
            password: encryptedPassword
        })
        const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        await user.save()
        return {
            success: true,
            message: USER_CREATED,
            user: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                token: token
            }
        }
    }
}
const onResetPassword = async({email,password}) => {
    const USER_DOESNT_EXIST = await UserSchema.findOne({ email: email })
    if (!USER_DOESNT_EXIST) {
        return {
            success: false,
            message: USER_NOT_FOUND
        }
    }
    else {
        const encryptedPassword = await bycrypt.hash(password, 10)
        const user = await UserSchema.findOneAndUpdate({ email: email }, { password: encryptedPassword })
        return {
            success: true,
            message: USER_UPDATED,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: user.token
            }
        }
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
