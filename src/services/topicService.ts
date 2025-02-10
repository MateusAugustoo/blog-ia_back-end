import { prisma } from "../prisma";

export const TopicService = {
  async getAll() {
    return await prisma.topic.findMany();
  },

  async create(title: string) {
    return await prisma.topic.create({ data: { title } });
  },

  async delete(id: string) {
    return await prisma.topic.delete({ where: { id } });
  },
};
