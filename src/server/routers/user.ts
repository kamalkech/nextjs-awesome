/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

/**
 * Default selector for user.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
});

export const userRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      email: z.string().email(),
      name: z.string().min(3),
    }),
    async resolve({ input }) {
      const user = await prisma.user.create({
        data: input,
        select: defaultUserSelect,
      });
      return user;
    },
  })
  // read
  .query('all', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.user.findMany({
        select: defaultUserSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: { id },
        select: defaultUserSelect,
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }
      return user;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.number(), // z.string().uuid(),
      data: z.object({
        email: z.string().min(1).max(32).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const user = await prisma.user.update({
        where: { id },
        data,
        select: defaultUserSelect,
      });
      return user;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.user.delete({ where: { id } });
      return {
        id,
      };
    },
  });
