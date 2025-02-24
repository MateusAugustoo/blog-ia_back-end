import "fastify";
import { TUser } from "./userSchemaZod";

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }
}
