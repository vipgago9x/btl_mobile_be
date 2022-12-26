const express = require("express");
const chatController = require("../../controllers/chatController");

const router = express.Router();

/**
 * @swagger
 * /chat/get-chat-list:
 *   get:
 *     tags:
 *        - Chat
 *     summary: Get chat list
 *     responses:
 *          200:
 *              description:
 *                  Get users successfully!
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
 *                                      email:
 *                                          type: string
 *                                      fullname:
 *                                          type: string
 *                                      avatar:
 *                                          type: string
 *                                      isRead:
 *                                          type: bool
 *
 *          500:
 *              description:
 *                  Get users failurely!
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
 *                                      userId:
 *                                          type: integer
 */
router.get("/get-chat-list", chatController.getChatList);

/**
 * @swagger
 * /chat/read-user-message:
 *   patch:
 *     tags:
 *        - Chat
 *     summary: Read user message
 *     parameters:
 *        - in: path
 *          name: id1
 *          schema:
 *              type: integer
 *        - in: path
 *          name: id2
 *          schema:
 *              type: integer
 *     responses:
 *          200:
 *              description:
 *                  Get users successfully!
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
 *
 *          500:
 *              description:
 *                  Get users failurely!
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
router.patch("/read-user-message", chatController.readUserMessage);

/**
 * @swagger
 * /chat/get-user-messages:
 *   get:
 *     tags:
 *        - Chat
 *     summary: Get user message
 *     parameters:
 *        - in: path
 *          name: id
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
 *     responses:
 *          200:
 *              description:
 *                  Get users successfully!
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
 *
 *          500:
 *              description:
 *                  Get users failurely!
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
router.get("/get-user-messages", chatController.getUserMessages);

module.exports = router;
