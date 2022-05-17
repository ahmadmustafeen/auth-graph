const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./src/typeDefs");
const { resolvers } = require("./src/resolvers");



const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});
server
  .listen(8080)
  .then(({ url }) => console.log(`GraphQL server running at ${url}`));
