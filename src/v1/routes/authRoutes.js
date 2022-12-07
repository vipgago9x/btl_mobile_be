const express = require("express");
const authController = require("../../controllers/authController");

const router = express.Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *        - Auth
 *     summary: Login 
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *     responses:
 *          200:
 *              description:
 *                  Register successfully!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              payload:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                      expiredIn:
 *                                          type: integer
 *                                      user:
 *                                          type: object
 *                                          properties:
 *                                              id:
 *                                                  type: integer
 *                                              email:
 *                                                  type: string
 *                                              fullname:
 *                                                  type: string
 *                                              phone:
 *                                                  type: string
 *                                              avatar:
 *                                                  type: string
 *                                              address:
 *                                                  type: string
 *                                              type:
 *                                                  type: integer
 *                                              status:
 *                                                  type: integer
 *
 *          500:
 *              description:
 *                  Register failurely!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              payload:
 *                                  type: object
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *        - Auth
 *     summary: Register (Use FormData)
 *     requestBody:
 *          required: false
 *          content:
 *              FormData:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          avatar:
 *                              type: file
 *                          phone:
 *                              type: string
 *                          fullname:
 *                              type: string
 *                          dateOfBirth:
 *                              type: string
 *                          address:
 *                              type: string
 *                          type:
 *                              type: integer
 *                          status:
 *                              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Register successfully!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              payload:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                      expiredIn:
 *                                          type: integer
 *                                      user:
 *                                          type: object
 *                                          properties:
 *                                              id:
 *                                                  type: integer
 *                                              email:
 *                                                  type: string
 *                                              fullname:
 *                                                  type: string
 *                                              phone:
 *                                                  type: string
 *                                              avatar:
 *                                                  type: string
 *                                              address:
 *                                                  type: string
 *                                              type:
 *                                                  type: integer
 *                                              status:
 *                                                  type: integer
 *
 *          500:
 *              description:
 *                  Register failurely!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              payload:
 *                                  type: object
 */
router.post("/register", authController.register);

module.exports = router;