import { z } from "zod";
import { FastifyTypeInstance } from "../types/types";
import { TopicService } from "../services/topicService";

export const topicRoute = async (app: FastifyTypeInstance) => {
  app.get(
    "/topics",
    {
      schema: {
        tags: ["topics"],
        description: "Liste todos os tópicos existentes",
      },
    },
    async (request, reply) => {
      try {
        const topics = await TopicService.getAll();

        return reply.code(200).send(topics);
      } catch (error: Error | any) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );

  app.post(
    "/topics",
    {
      schema: {
        tags: ["topics"],
        description:
          "Crie um novo tópico informando o title, cada title e único",
        body: z.object({
          title: z.string(),
        }),
      },
    },
    async (request, reply) => {

      const titlesExist = await TopicService.getAll();

      if (!request.body.title) {
        return reply.code(400).send({ message: "Title is required" });
      }
      
      try {
        const { title } = request.body;

        if (titlesExist.some(topic => topic.title === title)) {
          return reply.code(400).send({ message: "Title already exists" });
        }

        const topic = await TopicService.create(title);
        return reply.code(201).send(topic);

      } catch (error: Error | any) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );

  app.delete(
    "/topics/:id",
    {
      schema: {
        tags: ["topics"],
        description: "Deleta um tópico informando o id",
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        await TopicService.delete(id);

        return reply.code(204).send();
      } catch (error: Error | any) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );
};
