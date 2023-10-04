import {FastifyInstance} from 'fastify'
import {userController} from "../controllers/user.controller";
import {userSchemas} from "../schemas/user.schemas";

export default async (fastify: FastifyInstance) => {
    fastify.post('/registration', userSchemas.registrationScheme, userController.registration);
    fastify.post('/login', userSchemas.loginScheme, userController.login);
    fastify.post('/logout', userController.logout);
    fastify.get('/refresh', userController.refresh);
}