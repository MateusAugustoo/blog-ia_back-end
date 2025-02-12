import { prisma } from "../prisma";
import { ulid } from 'ulid'

export const TopicService = {
  async getAll() {
    return await prisma.topic.findMany();
  },

  async create(title: string) {
    const id = ulid()
    return await prisma.topic.create({ data: { id, title } });
  },

  async delete(id: string) {
    return await prisma.topic.delete({ where: { id } });
  },
};
