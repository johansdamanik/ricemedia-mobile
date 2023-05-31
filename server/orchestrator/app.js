const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const [userTypeDefs, userResolvers] = require('./schema/UserSchema');
const [postTypeDefs, postResolvers] = require('./schema/PostSchema');
const [categoryTypeDefs, categoryResolvers] = require('./schema/CategorySchema');

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, categoryTypeDefs],
  resolvers: [userResolvers, postResolvers, categoryResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then((result) => {
    console.log(`APOLLO: Server ready at: ${result.url}`);
  })
  .catch((error) => {
    console.log(error);
  });
