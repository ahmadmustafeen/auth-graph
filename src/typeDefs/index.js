const {gql} = require('apollo-server');
const typeDefs = gql`
  type User {
    firstName: String!
    email:String!,
    phoneNumber:String!,
    lastName: String!,
    token: String
  }
  type SigninResponse {
    success: Boolean!
    message: String!
    user: User
  }
  type SignupResponse {
    success: Boolean!
    message: String!
    user: User
  }
  type ResetPasswordResponse {
    success: Boolean!
    message: String!
    user: User
  }
  type ForgetPasswordResponse {
    success: Boolean!
    message: String!
    user: User
  }
  type OtpVerifyResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    hello: String!
    randomNumber: Int!
    signin(username:String,password:String): SigninResponse
    signup(firstName:String,lastName:String,email:String,phoneNumber:String,password:String): SignupResponse
    verifyOtp(email:String,otp:String): OtpVerifyResponse
    forgetPassword(email:String): ForgetPasswordResponse
    resetPassword(email:String,password:String): ResetPasswordResponse
  }
  
  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User
    editUser(firstName: String!, lastName: String!, age: Int!): User
    deleteUser(firstName: String!): User
  }
`;

module.exports = {typeDefs};