import { z } from "zod";
import { FastifyTypeInstance } from "../types/typeFastifyInstance";
import { TopicService } from "../services/topicService";

export const topicRoute = async (app: FastifyTypeInstance) => {
  app.get(
    "/topics",
    {
      schema: {
        tags: ["Topics"],
        description: "List all existing topics",
        response: {
          200: z
            .array(
              z.object({
                id: z.string(),
                title: z.string(),
              })
            )
            .or(z.object({ message: z.string() })),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (_, reply) => {
      try {
        const topics = await TopicService.getAll();

        if (topics.length === 0) {
          return reply.code(200).send({ message: "No topics found" });
        }

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
        tags: ["Topics"],
        description:
          "Create a new topic stating the title, each title is unique",
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
          500: z.object({
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
        tags: ["Topics"],
        description: "Delete a topic by entering the id",
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;

        if (!id) {
          return reply.code(400).send({ message: "Invalid id" });
        }

        await TopicService.delete(id);
        return reply.code(204).send({ message: "Topic deleted" });
      } catch (error: Error | any) {
        return reply.code(500).send({ message: error.message });
      }
    }
  );
};
