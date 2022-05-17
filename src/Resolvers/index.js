const { onSignIn, onSignUp, onVerifyOTP, onForgetPassword, onResetPassword } = require("../helpers");

const resolvers = {
  Query: {
    randomNumber: () => Math.floor(Math.random() * 100).toString(),
    signin: (_,args,context,info)=>onSignIn(args),
    signup: (_,args,context,info)=>onSignUp(args),
    verifyOtp: onVerifyOTP,
    forgetPassword: onForgetPassword,
    resetPassword: onResetPassword
  },
};


module.exports = { resolvers };