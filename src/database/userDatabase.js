const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const argonHelper = require("../helpers/argonHelper");

const login = async (email, password) => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (await argonHelper.verify(password, data.password)) {
            return {
                ok: true,
                user: {
                    id: data.id,
                    email: data.email,
                    fullname: data.fullname,
                    avatar: data.avatar,
                    phone: data.phone,
                    dateOfBirth: data.dateOfBirth,
                    address: data.address,
                    type: data.type,
                    status: data.status
                }
            }
        } else {
            return {
                ok: false,
                message: "Invalid password"
            }
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const register = async (email, password, fullname, avatar, dateOfBirth, phone, address, type, status) => {
    try {
        type = parseInt(type);
        status = parseInt(status);
        const data = await prisma.user.create({
            data: {
                email: email,
                password,
                fullname,
                avatar,
                dateOfBirth,
                phone,
                address,
                type,
                status
            },
            select: {
                id: true,
                email: true,
                fullname: true,
                avatar: true,
                dateOfBirth: true,
                phone: true,
                address: true,
                type: true,
                status: true
            }
        });
        return {
            ok: true,
            user: data
        };

    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

module.exports = {
    register,
    login
}