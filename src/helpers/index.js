const bycrypt = require('bcryptjs')
const UserSchema = require("../models/UserSchema")
const OtpSchema = require("../models/OTPSchema")
const jwt = require('jsonwebtoken')
const { LOGIN_SUCCESS, USER_PASSWORD_INCORRECT, USER_NOT_FOUND, USER_EXIST, USER_CREATED, EMAIL_ERROR, USER_UPDATED, USER_OTP_NOT_FOUND, USER_OTP_VERIFIED } = require("../constants")

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
const onResetPassword = async ({ email, password }) => {
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
const onForgetPassword = async ({ email }) => {
    const sendEmail = async (to, header, content) => {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.user_email,
                pass: process.env.user_password,
            },
        });

        var mailOptions = {
            from: process.env.user_email,
            to: to,
            subject: header,
            text: content,
        };
        let resolved = true;
        transporter.sendMail(mailOptions, function (error, info) {
            if (info) {
                resolved = true;
            } else {
                resolved = false;
            }
        });
        return resolved;
    }
    const userExists = await UserSchema.findOne({ email: email })
    if (!userExists) {
        return {
            success: false,
            message: USER_NOT_FOUND
        }
    }

    const OTP = Math.floor(Math.random() * 10000);
    const content = `Your OTP is ${OTP}`;
    const header = "OTP";
    if (await sendEmail(email, header, content)) {
        return {
            success: true,
            message: "OTP sent"
        }
    }
    else {
        return {
            success: false,
            message: EMAIL_ERROR
        }
    }
}
const onVerifyOTP = async ({email,otp}) => {
     const OTPExists = await OtpSchema.findOne({ email: email, otp: otp })
        if (!OTPExists) {
            return {
                success: false,
                message: USER_OTP_NOT_FOUND
            }
        }
        else {
            await OtpSchema.deleteOne({ email: email, otp: otp })
            return {
                success: true,
                message: USER_OTP_VERIFIED,
            }
        }
}


module.exports = {
    onSignIn,
    onSignUp,
    onResetPassword,
    onForgetPassword,
    onVerifyOTP,
};
