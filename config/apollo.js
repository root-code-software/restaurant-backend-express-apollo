const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/typeDef');
const resolvers = require('../graphql/resolver')

module.exports = (app) => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true
    });

    apollo.applyMiddleware({ app, path: '/graphql' });
}