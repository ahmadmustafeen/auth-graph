const bycrypt = require('bcryptjs')
const onSignIn =  async({username,password}) => {

    
    let data = await bycrypt.compare(username,"$2a$10$IWcedJTdb0RlbknhN0.d.uYrOfocszpp4.hjch13ENE83IASBfiTe")
    return {

        firstName:data.toString()||"worked",
        lastName:password||"worked",
        age: 11,
    }
}
const onSignUp = (user) => {
    return {
        firstName:"worked",
        lastName:"worked",
        age: 11,
    }
}
const onResetPassword = (user) => {
    return {
        firstName:"worked",
        lastName:"worked",
        age: 11,
    }
}

const onForgetPassword = (user) => {
    return {
        firstName:"worked",
        lastName:"worked",
        age: 11,
    }
}

const onVerifyOTP = (user) => {
    return {
        firstName:"worked",
        lastName:"worked",
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
