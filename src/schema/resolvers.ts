// src/schema/resolvers.ts
import { Resolvers } from './types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { registerSchema, loginSchema } from '../validation/user';


const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const resolvers: Resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },
    users: async () => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    register: async (_parent, args) => {
      const { username, email, password } = args;

      const parsed = registerSchema.safeParse({ username, email, password });
      if (!parsed.success) {
        throw new Error(parsed.error.errors.map(e => e.message).join(', '));
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      return {
        token,
        user,
      };
    },
    login: async (_parent, args) => {
      const { email, password } = args;

      const parsed = loginSchema.safeParse({ email, password });
      if (!parsed.success) {
        throw new Error(parsed.error.errors.map(e => e.message).join(', '));
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No user found with this email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      return {
        token,
        user,
      };
    },
  },
};
