import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({ logger: true })

const port: number = Number(process.env.PORT ?? 3000);

fastify.register(import('./routes/user.router'))

fastify.listen({ port: port }, async (err: Error|null, address: String) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server run on ${address}`);
});