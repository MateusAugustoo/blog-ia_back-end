import { prisma } from '../prisma'

export const BlogService = {
  async getAll(){
    return await prisma.blog.findMany()
  },

  async create(title: string, content: string, topicId: string){
    return await prisma.blog.create({ data: { title, content, topicId } })
  },

  async update(id: string, title: string, content: string, topicId: string){
    return await prisma.blog.update({ where: { id }, data: { title, content, topicId } })
  },

  async filterTopic(topicId: string){
    return await prisma.blog.findMany({ where: { topicId } })
  },

  async delete(id: string){
    return await prisma.blog.delete({ where: { id } })
  }
}