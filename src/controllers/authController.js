const formidable = require("formidable");
const uuid = require("uuid");
const fs = require("fs");
const config = require("../configs/config");
const userDatabase = require("../database/userDatabase");
const jwtHelper = require("../helpers/jwtHelper");
const argonHelper = require("../helpers/argonHelper");

const login = async (req, res) => {
    let result = await userDatabase.login(req.body.email, req.body.password);
    if (result.ok) {
        return res.status(200).send({
            ok: true,
            payload: {
                token: jwtHelper.jwtEncoder(result.user.id, result.user.email),
                expiredIn: 86400,
                user: result.user
            },
            message: "Login successfully!!",
        })
    } else {
        return res.status(500).send({
            ok: false,
            payload: null,
            message: result.message
        })
    }
}

const register = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (files.avatar) {
            const oldPath = files.avatar.filepath;
            const newFilename = uuid.v4();
            const newPath = "src/assets/images/" + newFilename + ".jpg";
            fs.copyFile(oldPath, newPath, async (err) => {
                if (err) throw err;
                let passHashed = await argonHelper.hash(fields.password);
                const result = await userDatabase.register(fields.email, passHashed,
                    fields.fullname, `${config.be_url}/v1/file/${newFilename}.jpg`, fields.dateOfBirth,
                    fields.phone, fields.address, fields.type, fields.status);
                if (result.ok) {
                    res.status(200).send({
                        ok: true,
                        payload: {
                            token: jwtHelper.jwtEncoder(result.user.id, result.user.email),
                            expiredIn: 86400,
                            user: result.user
                        },
                        message: "Register successfully!!",
                    });
                } else {
                    res.status(500).send({
                        ok: false,
                        payload: null,
                        message: result.message,
                    });
                }
            });
        } else {
            let passHashed = await argonHelper.hash(fields.password);
            const result = await userDatabase.register(fields.email, passHashed,
                fields.fullname, ``, fields.dateOfBirth,
                fields.phone, fields.address, fields.type, fields.status);
            if (result.ok) {
                res.status(200).send({
                    ok: true,
                    payload: {
                        token: jwtHelper.jwtEncoder(result.user.id, result.user.email),
                        expiredIn: 86400,
                        user: result.user
                    },
                    message: "Register successfully!!",
                });
            } else {
                res.status(500).send({
                    ok: false,
                    payload: null,
                    message: result.message,
                });
            }
        }
    })
}

module.exports = {
    login,
    register
}
