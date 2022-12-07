const categoryDatabase = require("../database/categoryDatabase");

const getAllCategory = async (req, res) => {
    const data = await categoryDatabase.getAllCategory();
    if (data.ok) {
        return res.status(200).send({
            ok: true,
            message: "Successful",
            payload: data.categories
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
    getAllCategory
}