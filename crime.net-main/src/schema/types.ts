// src/schema/types.ts
import { IResolvers } from '@graphql-tools/utils';
import { GraphQLResolveInfo } from 'graphql';

interface Context {
  req: Express.Request;
}

export type ResolverFn<ReturnType, Parent = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => ReturnType | Promise<ReturnType>;

export type Resolvers = IResolvers<Context>;
