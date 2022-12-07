const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCategory = async () => {
    try {
        const data = await prisma.category.findMany({
            where: {
                status: {
                    not: 0
                }
            }
        });
        return {
            ok: true,
            categories: data
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

module.exports = {
    getAllCategory
}