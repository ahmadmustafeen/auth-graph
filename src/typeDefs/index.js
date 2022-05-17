const {gql} = require('apollo-server');
const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    age: Int!
  }
  type Query {
    hello: String!
    randomNumber: Int!
    signin: User
  }
  
  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User
    editUser(firstName: String!, lastName: String!, age: Int!): User
    deleteUser(firstName: String!): User
  }
`;

module.exports = {typeDefs};