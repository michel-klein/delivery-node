import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ password, username }: ICreateClient) {
        //Validar se o usuário existe
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive",
                }
            }
        })

        if(clientExists) {
            throw new Error("client already exists")
        }
        //Criptografar a senha
        const hashPassword = await hash(password, 10);
        //Salvar o cliente
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            }
        })

        return client;
    }
}