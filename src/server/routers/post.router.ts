/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "~/server/createRouter";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  // author: true,
});

export const postRouter = createRouter()
  // create
  // .mutation("add", {
  //   input: z.object({
  //     // id: z.string().uuid().optional(),
  //     title: z.string().min(1).max(32),
  //     content: z.string().min(1),
  //     author: 1,
  //   }),
  //   async resolve({ input, ctx }) {
  //     const post = await ctx.prisma.post.create({
  //       data: input,
  //       select: defaultPostSelect,
  //     });
  //     return post;
  //   },
  // })
  // read
  .query("all", {
    async resolve({ ctx }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */
      return await ctx.prisma.post.findMany({
        select: defaultPostSelect,
      });
    },
  })
  .query("byId", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const { id } = input;
      const post = await ctx.prisma.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return post;
    },
  })
  // update
  .mutation("edit", {
    input: z.object({
      id: z.number(), // z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        // text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input, ctx }) {
      const { id, data } = input;
      const post = await ctx.prisma.post.update({
        where: { id },
        data,
        select: defaultPostSelect,
      });
      return post;
    },
  })
  // delete
  .mutation("delete", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const { id } = input;
      await ctx.prisma.post.delete({ where: { id } });
      return {
        id,
      };
    },
  });