import { prisma } from "../prisma";
import { ulid } from "ulid";
import { userSchema } from "../types/userSchemaZod";
import { z } from "zod";

type UserSchema = z.infer<typeof userSchema>;

export const UserService = {
  async register({ uid, email, photo, name, username }: UserSchema) {
    const id = ulid();
    const user = await prisma.user.create({
      data: {
        id,
        uid,
        email,
        photo,
        name,
        username,
      },
    });

    return {
      userId: user.id
    }
  },

  async login() {},
};
