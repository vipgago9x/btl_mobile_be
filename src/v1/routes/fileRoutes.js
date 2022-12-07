const express = require("express");
const fileController = require("../../controllers/fileController");

const router = express.Router();
/**
 * @swagger
 * /file/:filename:
 *   get:
 *     tags:
 *        - File
 *     summary: View Image
 *     responses:
 *          200:
 *              description:
 *                 View successfully!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          500:
 *              description:
 *                   View failurely!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */
router.get("/:filename", fileController.viewFile);

module.exports = router;
