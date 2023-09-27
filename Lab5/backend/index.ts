import Fastify, {FastifyReply, FastifyRequest} from 'fastify'
import dotenv from 'dotenv'

const fastify = Fastify()
dotenv.config()

const port: number = Number(process.env.PORT ?? 3000);

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ hello: 'hello' });
});

fastify.listen({ port: port }, async (err: Error|null, address: String) => {
    if (err) {
        process.exit(1);
    }
    console.log(`Server run on ${address}`);
})