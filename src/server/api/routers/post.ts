import { z } from "zod";

import { postSchema } from "@/lib/schemas/post-schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/posts/hello',
        summary: 'Say Hello',
        tags: ['post'],
      },
    })
    .input(z.object({ text: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/posts/create',
        tags: ['post'],
        summary: 'Creates a new Post',
      },
    })
    .input(z.object({ name: z.string().min(1) }))
    .output(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.meta({
    openapi: {
      method: 'GET',
      path: '/posts/latest',
      tags: ['post'],
      summary: 'Gets latest post',
    },
  })
    .input(z.object({}))
    .output(postSchema)
    .query(({ ctx }) => {
      const post = ctx.db.post.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
      });
      return postSchema.parse(post);
    }),

  getSecretMessage: protectedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/posts/secret',
        tags: ['post'],
        summary: 'Gets a secret message',
      },
    })
    .input(z.object({}))
    .output(z.string())
    .query(() => {
      return "you can now see this secret message!";
    }),
});
