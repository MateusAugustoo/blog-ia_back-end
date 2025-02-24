import { FastifyReply, FastifyRequest } from 'fastify'
import { auth } from '../firebase'

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    reply.status(401).send({ message: 'Token not provided' });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    request.user = decodedToken;
  } catch (error) {
    reply.status(401).send({ message: 'Invalid token' });
  }
}