const { importSchema } = require('graphql-import');

const typeDefs = importSchema('graphql/typeDef/schema.graphql');

module.exports = typeDefs;