import { z } from 'zod';
import { publicProcedure, router } from '../trpc'

export const todoRouter = router({
    create: publicProcedure
        .input(
            z.object({
                title: z.string().trim().min(1, { message: 'Please enter value longer than 1 character' }),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            console.log('input', input);
            // console.log('ctx', ctx);
            const a = await ctx.prisma.todo.create({ data: input })
            console.log('a', a);

            return input
            // [...]
        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.todo.findMany()
    })
})  