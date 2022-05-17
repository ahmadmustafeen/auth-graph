const {gql} = require('apollo-server');
const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    age: Int!
    token: String
  }
  type SigninResponse {
    success: Boolean!
    message: String!
    user: User
  }
  type Query {
    hello: String!
    randomNumber: Int!
    signin(username:String,password:String): SigninResponse
    signup: User
    verifyOtp: User
    forgetPassword: User
    resetPassword: User
  }
  
  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User
    editUser(firstName: String!, lastName: String!, age: Int!): User
    deleteUser(firstName: String!): User
  }
`;

module.exports = {typeDefs};