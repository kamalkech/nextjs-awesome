/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { z } from "zod";
import { createRouter } from "~/server/createRouter";

/**
 * Default selector for user.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  // name: true,
});

export const userRouter = createRouter()
  // create
  // .mutation('add', {
  //   input: z.object({
  //     email: z.string().email(),
  //     name: z.string().min(3),
  //   }),
  //   async resolve({ input }) {
  //     const user = await prisma.user.create({
  //       data: input,
  //       select: defaultUserSelect,
  //     });
  //     return user;
  //   },
  // })
  //* signup
  .mutation("signup", {
    input: z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  })

  // read
  .query("all", {
    async resolve({ ctx }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return ctx.prisma.user.findMany({
        select: defaultUserSelect,
      });
    },
  })
  .query("byId", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const { id } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { id },
        select: defaultUserSelect,
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id '${id}'`,
        });
      }
      return user;
    },
  })
  // update
  .mutation("edit", {
    input: z.object({
      id: z.number(), // z.string().uuid(),
      data: z.object({
        email: z.string().min(1).max(32).optional(),
      }),
    }),
    async resolve({ input, ctx }) {
      const { id, data } = input;
      const user = await ctx.prisma.user.update({
        where: { id },
        data,
        select: defaultUserSelect,
      });
      return user;
    },
  })
  // delete
  .mutation("delete", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const { id } = input;
      await ctx.prisma.user.delete({ where: { id } });
      return {
        id,
      };
    },
  });
