import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

import { loginSchema } from "./validation/auth";
import { prisma } from "~/server/prisma";

// import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
// import { Redis } from "@upstash/redis";
// import "dotenv/config";

export const nextAuthOptions: NextAuthOptions = {
  // adapter: UpstashRedisAdapter(
  //   new Redis({
  //     url: process.env.UPSTASH_REDIS_URL,
  //     token: process.env.UPSTASH_REDIS_TOKEN,
  //   })
  //   // { baseKeyPrefix: "app-specific-prefix-1:" }
  // ),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
    // Github
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
  // secret: process.env.NEXT_PUBLIC_SECRET,
};
