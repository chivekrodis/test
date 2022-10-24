import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { Todo } from '@prisma/client'

export const todoRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(1, { message: 'Please enter value longer than 1 character' }),
      }),
    )
    .mutation(async (b) => {
      console.log(b)

      const { input, ctx } = b
      console.log('input', input)
      // console.log('ctx', ctx);
      const a = await ctx.prisma.todo.create({ data: input })
      console.log('a', a)

      return input
    }),
  toggle: publicProcedure
    .input(
      z.object({
        id: z.number(),
        checked: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input)
      const { id, checked } = input
      await ctx.prisma.todo.update({
        where: { id },
        data: { checked: !checked },
      })
    }),
  remove: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    const { id } = input
    await ctx.prisma.todo.delete({
      where: { id },
    })
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({
      orderBy: { createdAt: 'asc' },
    })
  }),
})
