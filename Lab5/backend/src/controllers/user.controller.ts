import {FastifyReply, FastifyRequest} from 'fastify'

export const userController = {
    async registration(request: FastifyRequest, reply: FastifyReply) {
        reply.send({ hello: 'hello' });
    },

    async login(request: FastifyRequest, reply: FastifyReply) {
        reply.send({ hello: 'hello' });
    },

    async logout(request: FastifyRequest, reply: FastifyReply) {
        reply.send({ hello: 'hello' });
    },

    async refresh(request: FastifyRequest, reply: FastifyReply) {
        reply.send({ hello: 'hello' });
    },
}