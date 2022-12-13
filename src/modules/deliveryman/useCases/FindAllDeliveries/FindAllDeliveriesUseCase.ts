import { prisma } from "../../../../database/prismaClient";


export class FindAllDeliveriesUseCase {
    async execute(id_deliveryman: string) {
        const deliveries = await prisma.deliveryman.findMany({
            where: {
                id: id_deliveryman
            },
            select: {
                deliveries: true,
                id: true,
                usename: true,
            },
        });

        return deliveries;
    }
}