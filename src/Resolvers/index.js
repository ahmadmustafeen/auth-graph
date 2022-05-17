const { onSignIn } = require("../helpers");

const resolvers = {
    Query: {
      randomNumber: () => Math.floor(Math.random() * 100).toString(),
      signin: ()=>onSignIn()
    },
  };


  module.exports = {resolvers};