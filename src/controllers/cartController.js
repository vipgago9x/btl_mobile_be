const cartDatabase = require("../database/cartDatabase");

const getSellCart = async (req, res) => {
    const data = await cartDatabase.getSellCart(req.body.currentUserId, req.query.pageSize, req.query.pageNumber);
    if (data.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: data.carts,
            total: data.total
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: data.message,
            payload: null
        })
    }
}
const getBuyCart = async (req, res) => {
    const data = await cartDatabase.getBuyCart(req.body.currentUserId, req.query.pageSize, req.query.pageNumber);
    if (data.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: data.carts,
            total: data.total
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: data.message,
            payload: null
        })
    }
}
const createCart = async (req, res) => {
    const data = await cartDatabase.createCart(req.body.items, req.body.currentUserId);
    if (data.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: data.carts
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: data.message,
            payload: null
        })
    }
}

const sellerChangeStatus = async (req, res) => {
    const data = await cartDatabase.sellerChangeStatus(req.query.id, req.body.currentUserId, req.query.status);
    if (data.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: {
                id: parseInt(req.query.id)
            }
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: data.message,
            payload: null
        })
    }
}

const buyerDeleteCart = async (req, res) => {
    const data = await cartDatabase.buyerDeleteCart(req.query.id, req.body.currentUserId);
    if (data.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: {
                id: parseInt(req.query.id)
            }
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: data.message,
            payload: null
        })
    }
}
module.exports = {
    getSellCart,
    getBuyCart,
    createCart,
    buyerDeleteCart,
    sellerChangeStatus
}