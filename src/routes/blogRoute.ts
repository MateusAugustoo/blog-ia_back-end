import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { FastifyTypeInstance } from "../types/types";

export const blogRoute = async (app: FastifyTypeInstance) => {
  app.get('/topics', async (request: FastifyRequest, reply: FastifyReply) => {})

  app.post('/topics', {
    schema: {
      body: z.object({
        title: z.string()
      })
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {})
}
