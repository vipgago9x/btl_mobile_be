const express = require("express");
const itemController = require("../../controllers/itemController");

const router = express.Router();


/**
 * @swagger
 * /item/get-item-detail:
 *   get:
 *     tags:
 *        - Item
 *     summary: Lấy về chi tiết một item theo id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Get Item successfully!
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
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      price:
 *                                          type: float
 *                                      quantity:
 *                                          type: integer
 *                                      userId:
 *                                          type: integer
 *                                      type:
 *                                          type: integer
 *                                      status:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: integer
 *                                      updatedAt:
 *                                          type: integer
 *                                      images:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  itemId:
 *                                                      type: integer
 *                                                  url:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  name:
 *                                                      type: string
 *                                                  description:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *
 *          500:
 *              description:
 *                  Get Item failurely!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              total:
 *                                  type: integer
 *                              payload:
 *                                  type: object
 */
router.get("/get-item-detail", itemController.getItemDetail);

/**
 * @swagger
 * /item/search-items:
 *   get:
 *     tags:
 *        - Item
 *     summary: Tìm kiếm items và sắp xếp theo trường price hoặc quantity (Có thể dùng ở màn xem tất cả sản phẩm phía người mua)
 *     parameters:
 *        - in: path
 *          name: searchText
 *          schema:
 *              type: string
 *        - in: path
 *          name: categoryId
 *          schema:
 *              type: integer
 *        - in: path
 *          name: pageSize
 *          schema:
 *              type: integer
 *        - in: path
 *          name: pageNumber
 *          schema:
 *              type: integer
 *        - in: path
 *          name: sortField
 *          schema:
 *              type: string
 *          description: Tên trường muốn sắp xếp. Có 2 trường là 'price' và 'quantity'
 *        - in: path
 *          name: sortType
 *          schema:
 *              type: string
 *          description: Kiểu sắp xếp. Có 2 kiểu là 'asc' là tăng dần và 'desc' là giảm dầm
 *     responses:
 *          200:
 *              description:
 *                  Get Item successfully!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              total:
 *                                  type: integer
 *                              payload:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      price:
 *                                          type: float
 *                                      quantity:
 *                                          type: integer
 *                                      userId:
 *                                          type: integer
 *                                      type:
 *                                          type: integer
 *                                      status:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: integer
 *                                      updatedAt:
 *                                          type: integer
 *                                      imageURL:
 *                                          type: string
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  name:
 *                                                      type: string
 *                                                  description:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *
 *          500:
 *              description:
 *                  Get Item failurely!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              total:
 *                                  type: integer
 *                              payload:
 *                                  type: object
 */
router.get("/search-items", itemController.searchItem);

/**
 * @swagger
 * /item/get-owned-items:
 *   get:
 *     tags:
 *        - Item
 *     summary: Lấy về toàn bộ items của account đang đăng nhập đã tạo
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
 *                  Get Item successfully!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              total:
 *                                  type: integer
 *                              payload:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      price:
 *                                          type: float
 *                                      quantity:
 *                                          type: integer
 *                                      userId:
 *                                          type: integer
 *                                      type:
 *                                          type: integer
 *                                      status:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: integer
 *                                      updatedAt:
 *                                          type: integer
 *                                      images:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  itemId:
 *                                                      type: integer
 *                                                  url:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  name:
 *                                                      type: string
 *                                                  description:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *
 *          500:
 *              description:
 *                  Get Item failurely!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              total:
 *                                  type: integer
 *                              payload:
 *                                  type: object
 */
router.get("/get-owned-items", itemController.getOwnItem);
/**
 * @swagger
 * /item/create:
 *   post:
 *     tags:
 *        - Item
 *     summary: Create Item (using FormData)
 *     requestBody:
 *          required: true
 *          content:
 *              FormData:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: float
 *                          quantity:
 *                              type: integer
 *                          type:
 *                              type: integer
 *                          status:
 *                              type: integer
 *                          categoryIds:
 *                              type: array
 *                              items:
 *                                  type: integer
 *                          images:
 *                              type: array
 *                              items:
 *                                  type: file
 *     responses:
 *          200:
 *              description:
 *                  Create Item successfully!
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
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      price:
 *                                          type: float
 *                                      quantity:
 *                                          type: integer
 *                                      userId:
 *                                          type: integer
 *                                      type:
 *                                          type: integer
 *                                      status:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: integer
 *                                      updatedAt:
 *                                          type: integer
 *                                      images:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  itemId:
 *                                                      type: integer
 *                                                  url:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  name:
 *                                                      type: string
 *                                                  description:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *
 *          500:
 *              description:
 *                  Create Item failurely!
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
router.post("/create", itemController.createItem);

/**
 * @swagger
 * /item/edit:
 *   patch:
 *     tags:
 *        - Item
 *     summary: Edit Item (using FormData)
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *     requestBody:
 *          required: true
 *          content:
 *              FormData:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: float
 *                          quantity:
 *                              type: integer
 *                          type:
 *                              type: integer
 *                          status:
 *                              type: integer
 *                          images:
 *                              type: array
 *                              items:
 *                                  type: file
 *                          removeImageIds:
 *                              type: array
 *                              items:
 *                                  type: integer
 *                          categoryIds:
 *                              type: array
 *                              items:
 *                                  type: integer
 *     responses:
 *          200:
 *              description:
 *                  Edit item successfully!
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
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      price:
 *                                          type: float
 *                                      quantity:
 *                                          type: integer
 *                                      userId:
 *                                          type: integer
 *                                      type:
 *                                          type: integer
 *                                      status:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: integer
 *                                      updatedAt:
 *                                          type: integer
 *                                      images:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  itemId:
 *                                                      type: integer
 *                                                  url:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                  name:
 *                                                      type: string
 *                                                  description:
 *                                                      type: string
 *                                                  type:
 *                                                      type: integer
 *                                                  status:
 *                                                      type: integer
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
router.patch("/edit", itemController.editItem);


/**
 * @swagger
 * /item/delete:
 *   delete:
 *     tags:
 *        - Item
 *     summary: Delete Item
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Delete item successfully!
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
 *                  Delete item failurely!
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
router.delete("/delete", itemController.deleteItem);

module.exports = router;