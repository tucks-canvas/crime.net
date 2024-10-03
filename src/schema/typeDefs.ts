// src/schema/typeDefs.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;


