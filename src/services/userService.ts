import { prisma } from "../prisma";
import { TUser } from "../types/TUser";
import { ulid } from "ulid";

export const UserService = {
  async register({ uid, email, password}: TUser){
    const id = ulid()
    const user = await prisma.user.create({ data: {
      id,
      uid,
      email,
      password
    }})

    return user
  },

  async login(){}
}