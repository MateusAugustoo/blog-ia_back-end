import { z } from "zod";
import { authMiddleware } from "../middlewares/authTokenUser";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { UserService } from "../services/userService";

export const useRouter: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/register/user",
    {
      preHandler: [authMiddleware],
      schema: {
        tags: ["User"],
        description: "Register new user",
        body: z.object({
          uid: z.string(),
          username: z.string(),
          photo: z.string().optional(),
          email: z.string().email(),
          name: z.string(),
        }),
        response: {
          201: z.object({
           userId: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        }
      },
    },
    async (request, reply) => {
      try {
        const { uid, username, photo, email, name } = request.body;
        const { userId } = await UserService.register({
          uid,
          username,
          photo,
          email,
          name,
        });

        return reply.status(201).send({ userId });
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          return reply.status(400).send({ message: error.message })
        }
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    }
  );
};
