import { z } from "zod";
import { FastifyTypeInstance } from "../types/types";
import { TopicService } from "../services/topicService";

export const blogRoute = async (app: FastifyTypeInstance) => {
  app.get('/topics', {
    schema: {
      tags: ['topics'],
    }
  }, async (request, reply) => {})

  app.post('/topics', {
    schema: {
      tags: ['topics'],
      body: z.object({
        title: z.string()
      })
    }
  }, async (request, reply) => {
    try {
      const { title } = request.body
      const topic = await TopicService.create(title)
      return reply.code(201).send(topic)
    } catch (error) {
      
    }
  })
}
