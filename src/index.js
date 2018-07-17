import { typeDefs, resolvers } from "./graphql-schema";
import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { v1 as neo4j } from "neo4j-driver";
import { augmentSchema } from "neo4j-graphql-js";
import dotenv from "dotenv";

dotenv.config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false  // ref 1
  }
});

// Issues 
// 2) The following is appearing, despite following advice: settingsType "Symptom" is missing a "resolveType" resolver.
// ...Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this warning.
// ...See (1) above. It looks like this is due to augmentSchema. See below.
// ...I filed a GH issue: https://github.com/neo4j-graphql/neo4j-graphql-js/issues/76
const augmentedSchemaWithMutations = augmentSchema(schema);

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "neo4j"
  )
);

const server = new ApolloServer({
  context: { driver },
  schema: augmentedSchemaWithMutations
});

// Issues
// 3) Warning: `onTypeConflict` is deprecated. Use schema transforms to customize merging logic.
// ...I filed a GH issue: https://github.com/neo4j-graphql/neo4j-graphql-js/issues/77
server.listen(process.env.GRAPHQL_LISTEN_PORT, '0.0.0.0').then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});