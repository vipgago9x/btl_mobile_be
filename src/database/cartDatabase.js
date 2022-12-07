const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getSellCart = async (userId, pageSize, pageNumber) => {
    try {
        userId = parseInt(userId);
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);

        const total = await prisma.cart.count({
            where: {
                sellerUserId: userId,
            }
        });
        let carts = await prisma.cart.findMany({
            where: { sellerUserId: userId },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                amount: true,
                type: true,
                status: true,
                buyerUser: {
                    select: {
                        id: true,
                        email: true,
                        fullname: true
                    }
                },
                CartItem: {
                    select: {
                        item: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                                type: true,
                                status: true,
                                ItemCategory: {
                                    select: {
                                        category: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true
                                            }
                                        }
                                    }
                                },
                                ItemImage: {
                                    where: {
                                        status: {
                                            not: 0
                                        }
                                    },
                                    select: {
                                        url: true
                                    }
                                }
                            }
                        },
                        quantity: true
                    },
                }
            }
        });
        carts = carts.map(element1 => {
            element1.items = element1.CartItem.map(element2 => {
                element2.item.categories = element2.item.ItemCategory.map(element3 => element3.category);
                delete element2.item["ItemCategory"];
                element2.item.imageUrl = element2.item.ItemImage.length > 0 ? element2.item.ItemImage[0].url : "";
                delete element2.item["ItemImage"];
                return element2.item;
            });
            delete element1["CartItem"];
            return element1;
        });
        return {
            ok: true,
            total: total,
            carts: carts
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const getBuyCart = async (userId, pageSize, pageNumber) => {
    try {
        userId = parseInt(userId);
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);

        const total = await prisma.cart.count({
            where: {
                buyerUserId: userId,
            }
        });
        let carts = await prisma.cart.findMany({
            where: { buyerUserId: userId },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                amount: true,
                type: true,
                status: true,
                sellerUser: {
                    select: {
                        id: true,
                        email: true,
                        fullname: true
                    }
                },
                CartItem: {
                    select: {
                        item: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                                type: true,
                                status: true,
                                ItemCategory: {
                                    select: {
                                        category: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true
                                            }
                                        }
                                    }
                                },
                                ItemImage: {
                                    where: {
                                        status: {
                                            not: 0
                                        }
                                    },
                                    select: {
                                        url: true
                                    }
                                }
                            }
                        },
                        quantity: true
                    },
                }
            }
        });
        carts = carts.map(element1 => {
            element1.items = element1.CartItem.map(element2 => {
                element2.item.categories = element2.item.ItemCategory.map(element3 => element3.category);
                delete element2.item["ItemCategory"];
                element2.item.imageUrl = element2.item.ItemImage.length > 0 ? element2.item.ItemImage[0].url : "";
                delete element2.item["ItemImage"];
                return element2.item;
            });
            delete element1["CartItem"];
            return element1;
        });
        return {
            ok: true,
            total: total,
            carts: carts
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const createCart = async (items, buyerUserId) => {
    try {
        buyerUserId = parseInt(buyerUserId);
        const createdCartList = await prisma.$transaction(async (tx) => {
            let items_info = []
            for (let i = 0; i < items.length; i++) {
                let item = await tx.item.findUnique({
                    where: {
                        id: items[i].id,
                    },
                    select: {
                        id: true,
                        price: true,
                        userId: true,
                        ItemCategory: {
                            select: {
                                category: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true
                                    }
                                }
                            }
                        },
                        ItemImage: {
                            where: {
                                status: {
                                    not: 0
                                }
                            },
                            select: {
                                url: true
                            }
                        },
                        name: true,
                        description: true,
                        type: true,
                        status: true
                    }
                });
                items_info.push({ ...item });
            }
            let carts = [];
            for (let i = 0; i < items_info.length; i++) {
                if (carts.length === 0) {
                    carts.push({
                        sellerUserId: items_info[i].userId,
                        amount: items_info[i].price * items[i].quantity,
                        items: [{
                            id: items_info[i].id,
                            quantity: items[i].quantity,
                            name: items_info[i].name,
                            description: items_info[i].description,
                            type: items_info[i].type,
                            status: items_info[i].status,
                            price: items_info[i].price,
                            imageUrl: items_info[i].ItemImage.length > 0 ? items_info[i].ItemImage[0].url : "",
                            categories: items_info[i].ItemCategory.map(element => {
                                return element.category;
                            }),
                        }]
                    });
                    continue;
                } else {
                    let isExisted = false;
                    for (let j = 0; j < carts.length; j++) {
                        if (carts[j].sellerUserId === items_info[i].userId) {
                            isExisted = true;
                            carts[j].items.push({
                                id: items_info[i].id,
                                quantity: items[i].quantity,
                                name: items_info[i].name,
                                description: items_info[i].description,
                                type: items_info[i].type,
                                status: items_info[i].status,
                                price: items_info[i].price,
                                imageUrl: items_info[i].ItemImage.length > 0 ? items_info[i].ItemImage[0].url : "",
                                categories: items_info[i].ItemCategory.map(element => {
                                    return element.category;
                                }),
                            });
                            carts[j].amount += (items_info[i].price * items[i].quantity);
                            break;
                        }
                    }
                    if (!isExisted) {
                        carts.push({
                            sellerUserId: items_info[i].userId,
                            amount: items_info[i].price * items[i].quantity,
                            items: [{
                                id: items_info[i].id,
                                quantity: items[i].quantity,
                                name: items_info[i].name,
                                description: items_info[i].description,
                                type: items_info[i].type,
                                status: items_info[i].status,
                                price: items_info[i].price,
                                imageUrl: items_info[i].ItemImage.length > 0 ? items_info[i].ItemImage[0].url : "",
                                categories: items_info[i].ItemCategory.map(element => {
                                    return element.category;
                                }),
                            }]
                        });
                    }
                }
            }
            let createdCarts = [];
            for (let i = 0; i < carts.length; i++) {
                let creatingCart = await tx.cart.create({
                    data: {
                        amount: carts[i].amount,
                        sellerUserId: carts[i].sellerUserId,
                        buyerUserId: buyerUserId,
                        type: 1,
                        status: 1
                    },
                    select: {
                        id: true,
                        amount: true,
                        sellerUser: {
                            select: {
                                id: true,
                                email: true,
                                fullname: true
                            }
                        },
                        type: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                });
                let createdCartItems = [];
                for (let j = 0; j < carts[i].items.length; j++) {
                    await tx.cartItem.create({
                        data: {
                            itemId: carts[i].items[j].id,
                            quantity: carts[i].items[j].quantity,
                            cartId: creatingCart.id,
                            type: 1,
                            status: 1
                        },
                    });
                    createdCartItems.push({
                        id: carts[i].items[j].id,
                        name: carts[i].items[j].name,
                        description: carts[i].items[j].description,
                        quantity: carts[i].items[j].quantity,
                        type: carts[i].items[j].type,
                        status: carts[i].items[j].status,
                        price: carts[i].items[j].price,
                        imageUrl: carts[i].items[j].imageUrl,
                        categories: carts[i].items[j].categories
                    });
                }
                creatingCart.items = [...createdCartItems];
                createdCarts.push({ ...creatingCart });
            }
            return createdCarts;
        });
        return {
            ok: true,
            carts: createdCartList
        }

    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const sellerChangeStatus = async (id, userId, status) => {
    try {
        id = parseInt(id);
        userId = parseInt(userId);
        status = parseInt(status);
        let cart = await prisma.cart.findUnique({ where: { id: id } });
        if (cart.status === 0) {
            return {
                ok: false,
                message: "Giỏ hàng đã bị xoá"
            };
        }
        if (cart.sellerUserId !== userId) {
            return {
                ok: false,
                message: "Bạn không có quyền thay đổi trạng thái giỏ hàng này!"
            }
        }
        await prisma.cart.update({ where: { id: id }, data: { status: status } });
        return {
            ok: true,
            message: "Thay đổi trạng thái giỏ hàng thành công"
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const buyerDeleteCart = async (id, userId) => {
    try {
        id = parseInt(id);
        userId = parseInt(userId);
        let cart = await prisma.cart.findUnique({ where: { id: id } });
        if (cart.status === 0) {
            return {
                ok: true,
                message: "Xoá giỏ hàng thành công"
            };
        }
        if (cart.buyerUserId !== userId) {
            return {
                ok: false,
                message: "Bạn không có quyền xoá giỏ hàng này!"
            }
        }
        if (cart.status > 1) {
            return {
                ok: false,
                message: "Bạn không thể xoá giỏ hàng khi nó đã được xác nhận. Vui lòng liên hệ người bán!"
            }
        }
        await prisma.cart.update({ where: { id: id }, data: { status: 0 } });
        return {
            ok: true,
            message: "Xoá giỏ hàng thành công"
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

module.exports = {
    getSellCart,
    getBuyCart,
    createCart,
    buyerDeleteCart,
    sellerChangeStatus
}