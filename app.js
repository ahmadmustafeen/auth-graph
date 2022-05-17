const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./src/typeDefs");
const { resolvers } = require("./src/Resolvers");
const { default: mongoose } = require("mongoose");
require("dotenv").config();



 
const url =process.env.MONGO_URL;
  const connect = mongoose.connect(url, { useNewUrlParser: true });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
  });
  
  connect.then(
  (db) => {
    server
    .listen(process.env.PORT||8080)
    .then(({ url }) => console.log(`GraphQL server running at ${url}`));
    },
  (err) => {
    console.log(err);
  }
);
