// src/index.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import dotenv from 'dotenv';
import { authenticate } from './middleware/auth';

dotenv.config();

const app = express() as any;
const PORT = process.env.PORT || 4000;

async function startServer() {
  app.use(authenticate);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { req, user: (req as any).user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
