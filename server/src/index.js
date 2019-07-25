const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Post = require('./resolvers/Post');
const Reply = require('./resolvers/Reply');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  Reply
};

const server = new GraphQLServer({
  typeDefs: './server/src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request, prisma
    };
  }
});

server.start(() => console.log('http://localhost:4000'));