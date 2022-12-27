const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getItemDetail = async (id) => {
    try {
        id = parseInt(id);

        const item = await prisma.item.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                type: true,
                price: true,
                quantity: true,
                createdAt: true,
                updatedAt: true,
                ItemImage: {
                    where: {
                        status: {
                            not: 0
                        }
                    }
                },
                ItemCategory: {
                    select: {
                        category: true
                    }
                }
            },
        }).then(item => {
            item.categories = item.ItemCategory.map(element => {
                return element.category;
            });
            delete item["ItemCategory"];
            item.images = item.ItemImage;
            delete item["ItemImage"];
            return item;
        })
        return {
            ok: true,
            item: item,
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const searchItems = async (searchText, categoryId, sortField, sortType, pageSize, pageNumber) => {
    try {
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        categoryId = parseInt(categoryId);
        let orderBy = {};
        if (sortField === 'price' || sortField === "quantity") {
            orderBy[sortField] = sortType;
        }
        let whereClause = `("Item"."name" ILIKE '${'%' + searchText + '%'}' or "Item"."description" ILIKE '${'%' + searchText + '%'}') `;
        if (categoryId && categoryId > 0) {
            whereClause += ` AND EXISTS(select * From "ItemCategory" where "ItemCategory"."categoryId" = ${categoryId} and "ItemCategory"."itemId" = "Item"."id") `;
        }

        let countQuery = `
        select count(*)
        from "Item" where ${whereClause} 
    `
        const total = await prisma.$queryRawUnsafe(countQuery);
        let item;
        let query = `select "id",
        "name",
        "description",
        "status",
        "type",
        "price",
        "quantity",
        "createdAt",
        "updatedAt",
        (select "url" from "ItemImage" where "ItemImage"."itemId" = "Item"."id" and "ItemImage"."status" <> 0 limit 1) as "imageURL"
        from "Item" `
            +
            `where ${whereClause} `
            +
            `offset ${(pageNumber - 1) * pageSize} limit ${pageSize}`;
        item = await prisma.$queryRawUnsafe(query);
        for (let i = 0; i < item.length; i++) {
            item[i].categories = await prisma.itemCategory.findMany({
                where: {
                    itemId: item[i].id
                },
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            status: true,
                            type: true
                        }
                    }
                }
            }).then(categories => {
                return categories.map(element => {
                    return element.category
                })
            })
        }
        return {
            ok: true,
            item: item,
            total: parseInt(total[0].count)
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const getOwnItem = async (userId, pageSize, pageNumber) => {
    try {
        userId = parseInt(userId);
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        const total = await prisma.item.count({
            where: {
                userId: userId,
                status: { not: 0 }
            }
        });
        const item = await prisma.item.findMany({
            where: {
                userId: userId,
                status: { not: 0 }
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                type: true,
                price: true,
                quantity: true,
                createdAt: true,
                updatedAt: true,
                ItemImage: {
                    where: {
                        status: {
                            not: 0
                        }
                    }
                },
                ItemCategory: {
                    select: {
                        category: true
                    }
                }
            },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize
        }).then(items => {
            return items.map(item => {
                item.categories = item.ItemCategory.map(element => {
                    return element.category;
                });
                delete item["ItemCategory"];
                item.images = item.ItemImage;
                delete item["ItemImage"];
                return item;
            });
        })
        return {
            ok: true,
            item: item,
            total: total
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const createItem = async (name, description, price, userId, quantity, type, status, imageUrls, categoryIds) => {
    try {
        userId = parseInt(userId);
        type = parseInt(type);
        status = parseInt(status);
        price = parseFloat(price);
        quantity = parseInt(quantity);
        categoryIds = JSON.parse(categoryIds);
        const item = await prisma.item.create({
            data: {
                name: name,
                description,
                price,
                quantity,
                user: { connect: { id: userId } },
                type,
                status
            },
        });
        let categories = [];
        for (let i = 0; i < categoryIds.length; i++) {
            let category = await prisma.itemCategory.create({
                data: {
                    itemId: item.id,
                    categoryId: parseInt(categoryIds[i]),
                    type: 1,
                    status: 1
                },
                select: {
                    category: true
                }
            });
            categories.push({ ...category.category });
        }
        let images = [];
        for (let i = 0; i < imageUrls.length; i++) {
            let image = await prisma.itemImage.create({
                data: {
                    itemId: item.id,
                    url: imageUrls[i],
                    type: 1,
                    status: 1
                },
            });
            images.push({ ...image });
        }
        item.images = images;
        item.categories = categories;
        return {
            ok: true,
            item: item
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const editItem = async (id, name, description, price, userId, quantity, type, status, addingImageUrls, removeImageIds, categoryIds) => {
    try {
        id = parseInt(id);
        status = parseInt(status);
        type = parseInt(type);
        quantity = parseInt(quantity);
        price = parseFloat(price);
        userId = parseInt(userId);
        categoryIds = JSON.parse(categoryIds);
        removeImageIds = JSON.parse(removeImageIds);
        let result = await prisma.$transaction(async (tx) => {
            await tx.itemCategory.deleteMany({ where: { itemId: id } });
            let categories = [];
            for (let i = 0; i < categoryIds.length; i++) {
                let category = await tx.itemCategory.create({
                    data: {
                        itemId: id,
                        categoryId: parseInt(categoryIds[i]),
                        type: 1,
                        status: 1
                    },
                    select: {
                        category: true
                    }
                });
                categories.push({ ...category.category });
            }
            await tx.itemImage.updateMany({
                data: {
                    status: 0
                }, where: {
                    id: { in: removeImageIds }
                }
            })
            for (let i = 0; i < addingImageUrls.length; i++) {
                let image = await tx.itemImage.create({
                    data: {
                        itemId: id,
                        url: addingImageUrls[i],
                        type: 1,
                        status: 1
                    },
                });
            }
            let item = await tx.item.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    description,
                    status,
                    type,
                    price,
                    quantity,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    type: true,
                    price: true,
                    quantity: true,
                    createdAt: true,
                    updatedAt: true,
                    ItemImage: {
                        where: {
                            status: {
                                not: 0
                            }
                        }
                    }
                }
            });
            item.images = [...item.ItemImage];
            item.categories = categories;
            delete item["ItemImage"];
            return item;
        });
        return {
            ok: true,
            item: result
        }

    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const deleteItem = async (id) => {
    try {
        id = parseInt(id);
        await prisma.item.update({
            where: {
                id: id
            },
            data: {
                status: 0
            }
        });
        return {
            ok: true,
            id: id
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

module.exports = {
    createItem,
    editItem,
    getOwnItem,
    searchItems,
    deleteItem,
    getItemDetail
}