const itemDatabase = require("../database/itemDatabase");
const formidable = require("formidable");
const fs = require("fs");
const config = require("../configs/config");
const uuid = require("uuid");

const getItemDetail = async (req, res) => {
    const result = await itemDatabase.getItemDetail(req.query.id);
    if (result.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: result.item,
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: result.message,
            total: 0,
            payload: null
        })
    }
}
const searchItem = async (req, res) => {
    const result = await itemDatabase.searchItems(req.query.searchText, req.query.categoryId, req.query.sortField, req.query.sortType, req.query.pageSize, req.query.pageNumber);
    if (result.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: result.item,
            total: result.total
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: result.message,
            total: 0,
            payload: null
        })
    }
}

const getOwnItem = async (req, res) => {
    const result = await itemDatabase.getOwnItem(req.body.currentUserId, req.query.pageSize, req.query.pageNumber);
    if (result.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: result.item,
            total: result.total
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: result.message,
            total: 0,
            payload: null
        })
    }
}
const createItem = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        let imageUrls = [];
        let imageNameList = Object.keys(files);
        for (let i = 0; i < imageNameList.length; i++) {
            let oldPath = files[imageNameList[i]].filepath;
            let newFilename = uuid.v4();
            let newPath = "src/assets/images/" + newFilename + ".jpg";
            fs.copyFileSync(oldPath, newPath);
            imageUrls.push(`${config.be_url}/v1/file/${newFilename}.jpg`);
        }
        const result = await itemDatabase.createItem(fields.name, fields.description, fields.price, req.body.currentUserId, fields.quantity, fields.type, fields.status, imageUrls, fields.categoryIds);
        if (result.ok) {
            res.status(200).send({
                ok: true,
                message: "",
                payload: result.item
            });
        } else {
            res.status(500).send({
                ok: false,
                message: result.message,
                payload: null
            })
        }
    })
}
const editItem = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        let imageUrls = [];
        let imageNameList = Object.keys(files);
        for (let i = 0; i < imageNameList.length; i++) {
            let oldPath = files[imageNameList[i]].filepath;
            let newFilename = uuid.v4();
            let newPath = "src/assets/images/" + newFilename + ".jpg";
            fs.copyFileSync(oldPath, newPath);
            imageUrls.push(`${config.be_url}/v1/file/${newFilename}.jpg`);
        }
        const result = await itemDatabase.editItem(req.query.id, fields.name, fields.description, fields.price, req.body.currentUserId, fields.quantity, fields.type, fields.status, imageUrls, fields.removeImageIds, fields.categoryIds);
        if (result.ok) {
            res.status(200).send({
                ok: true,
                message: "",
                payload: result.item
            });
        } else {
            res.status(500).send({
                ok: false,
                message: result.message,
                payload: null
            })
        }
    })
}

const deleteItem = async (req, res) => {
    const result = await itemDatabase.deleteItem(req.query.id);
    if (result.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: {
                id: result.id
            },
        })
    } else {
        return res.status(500).send({
            ok: false,
            message: result.message,
            payload: null
        })
    }
}


module.exports = {
    getItemDetail,
    createItem,
    editItem,
    getOwnItem,
    searchItem,
    deleteItem
}