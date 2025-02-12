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
          "Crie um novo tópico informando o title, cada title é único",
        body: z.object({
          title: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { title } = request.body;

        const titlesExist = await TopicService.getAll();
        if (titlesExist.some((topic) => topic.title === title)) {
          return reply.code(400).send({ message: "Title already exists" });
        }

        await TopicService.create(title);
        return reply.code(201).send({ message: "Topic created" });
      } catch (error) {
        console.error(error);
        return reply.code(500).send({ message: "Internal Server Error" });
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
