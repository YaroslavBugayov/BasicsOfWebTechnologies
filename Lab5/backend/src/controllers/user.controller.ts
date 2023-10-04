import {FastifyReply, FastifyRequest} from 'fastify'
import {RegistrationBody} from "../bodies/registration.body";
import {LoginBody} from "../bodies/login.body";
import {userService} from "../services/user.service";

export const userController = {
    async registration(request: FastifyRequest<{ Body: RegistrationBody }>, reply: FastifyReply) : Promise<FastifyReply | undefined> {
        const user = await userService.registration(request.body);
        reply.send();
    },

    async login(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) : Promise<FastifyReply | undefined> {
        const { email, password } = request.body;
        reply.send({ hello: 'hello' });
    },

    async logout(request: FastifyRequest, reply: FastifyReply) : Promise<FastifyReply | undefined> {
        reply.send({ hello: 'hello' });
    },

    async refresh(request: FastifyRequest, reply: FastifyReply) : Promise<FastifyReply | undefined> {
        reply.send({ hello: 'hello' });
    },
}