const express = require("express");
const categoryController = require("../../controllers/categoryController");

const router = express.Router();

/**
 * @swagger
 * /category/get-all:
 *   get:
 *     tags:
 *        - Category
 *     summary: Get All categories 
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
 *                                              name:
 *                                                  type: string
 *                                              description:
 *                                                  type: string
 *                                              createdAt:
 *                                                  type: string
 *                                              updatedAt:
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
router.get("/get-all", categoryController.getAllCategory);

module.exports = router