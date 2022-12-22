const express = require("express");
const cartController = require("../../controllers/cartController");

const router = express.Router();



/**
 * @swagger
 * /cart/get-sell-cart:
 *   get:
 *     tags:
 *        - Cart
 *     summary: Lấy danh sách giỏ hàng đã bán
 *     parameters:
 *        - in: path
 *          name: pageSize
 *          schema:
 *              type: integer
 *        - in: path
 *          name: pageNumber
 *          schema:
 *              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Create cart successfully!
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
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                              id:
 *                                                  type: integer
 *                                              amount:
 *                                                  type: float
 *                                              type:
 *                                                  type: integer
 *                                              status:
 *                                                  type: integer
 *                                              createdAt:
 *                                                  type: integer
 *                                              updatedAt:
 *                                                  type: integer
 *                                              buyerUser:
 *                                                  type: object
 *                                                  properties:
 *                                                      id:
 *                                                          type: integer
 *                                                      email:
 *                                                          type: string
 *                                                      fullname:
 *                                                          type: integer
 *                                              items:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          id:
 *                                                              type: integer
 *                                                          name:
 *                                                              type: string
 *                                                          description:
 *                                                              type: string
 *                                                          type:
 *                                                              type: integer
 *                                                          status:
 *                                                              type: integer
 *                                                          price:
 *                                                              type: float
 *                                                          quantity:
 *                                                              type: integer
 *                                                          categories:
 *                                                              type: array
 *                                                              items:
 *                                                                  type: object
 *                                                                  properties:
 *                                                                      id: 
 *                                                                          type: integer
 *                                                                      name:
 *                                                                          type: string
 *                                                                      description:
 *                                                                          type: string
 *
 *          500:
 *              description:
 *                  Edit item failurely!
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
router.get("/get-sell-cart", cartController.getSellCart);

/**
 * @swagger
 * /cart/get-buy-cart:
 *   get:
 *     tags:
 *        - Cart
 *     summary: Lấy danh sách giỏ hàng đã mua
 *     parameters:
 *        - in: path
 *          name: pageSize
 *          schema:
 *              type: integer
 *        - in: path
 *          name: pageNumber
 *          schema:
 *              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Create cart successfully!
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
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                              id:
 *                                                  type: integer
 *                                              amount:
 *                                                  type: float
 *                                              type:
 *                                                  type: integer
 *                                              status:
 *                                                  type: integer
 *                                              createdAt:
 *                                                  type: integer
 *                                              updatedAt:
 *                                                  type: integer
 *                                              sellerUser:
 *                                                  type: object
 *                                                  properties:
 *                                                      id:
 *                                                          type: integer
 *                                                      email:
 *                                                          type: string
 *                                                      fullname:
 *                                                          type: integer
 *                                              items:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          id:
 *                                                              type: integer
 *                                                          name:
 *                                                              type: string
 *                                                          description:
 *                                                              type: string
 *                                                          type:
 *                                                              type: integer
 *                                                          status:
 *                                                              type: integer
 *                                                          quantity:
 *                                                              type: integer
 *                                                          price:
 *                                                              type: float
 *                                                          categories:
 *                                                              type: array
 *                                                              items:
 *                                                                  type: object
 *                                                                  properties:
 *                                                                      id: 
 *                                                                          type: integer
 *                                                                      name:
 *                                                                          type: string
 *                                                                      description:
 *                                                                          type: string
 *
 *          500:
 *              description:
 *                  Edit item failurely!
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
router.get("/get-buy-cart", cartController.getBuyCart);

/**
 * @swagger
 * /cart/create:
 *   post:
 *     tags:
 *        - Cart
 *     summary: Create Cart
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          items:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                      quantity:
 *                                          type: integer
 *     responses:
 *          200:
 *              description:
 *                  Create cart successfully!
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
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                              id:
 *                                                  type: integer
 *                                              amount:
 *                                                  type: float
 *                                              type:
 *                                                  type: integer
 *                                              status:
 *                                                  type: integer
 *                                              createdAt:
 *                                                  type: integer
 *                                              updatedAt:
 *                                                  type: integer
 *                                              sellerUser:
 *                                                  type: object
 *                                                  properties:
 *                                                      id:
 *                                                          type: integer
 *                                                      email:
 *                                                          type: string
 *                                                      fullname:
 *                                                          type: integer
 *                                              items:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          id:
 *                                                              type: integer
 *                                                          name:
 *                                                              type: string
 *                                                          description:
 *                                                              type: string
 *                                                          type:
 *                                                              type: integer
 *                                                          status:
 *                                                              type: integer
 *                                                          price:
 *                                                              type: float
 *                                                          categories:
 *                                                              type: array
 *                                                              items:
 *                                                                  type: object
 *                                                                  properties:
 *                                                                      id: 
 *                                                                          type: integer
 *                                                                      name:
 *                                                                          type: string
 *                                                                      description:
 *                                                                          type: string
 *
 *          500:
 *              description:
 *                  Edit item failurely!
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
router.post("/create", cartController.createCart);


/**
 * @swagger
 * /cart/seller-change-status:
 *   patch:
 *     tags:
 *        - Cart
 *     summary: Người bán thay đổi trạng thái giỏ hàng
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *        - in: path
 *          name: status
 *          schema:
 *              type: integer
 *          description: Trạng thái của giỏ hàng. 0 là đã bị xoá, 1 là chờ xác nhận; 2 là đã xác nhận; 3 là đang vận chuyển; 4 là đã giao hàng
 *     responses:
 *          200:
 *              description:
 *                  Delete cart successfully!
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
 *                                      id:
 *                                          type: integer
 *          500:
 *              description:
 *                  Delete cart failurely!
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
router.patch("/seller-change-status", cartController.sellerChangeStatus);

/**
 * @swagger
 * /cart/buyer-delete:
 *   delete:
 *     tags:
 *        - Cart
 *     summary: Người mua xoá giỏ hàng
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Delete cart successfully!
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
 *                                      id:
 *                                          type: integer
 *          500:
 *              description:
 *                  Delete cart failurely!
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
router.delete("/buyer-delete", cartController.buyerDeleteCart);

module.exports = router;