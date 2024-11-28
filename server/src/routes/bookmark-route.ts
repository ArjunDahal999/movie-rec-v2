import express from 'express';
import { addBookMark } from '../controller/bookMarkController/add-bookmark';
import { deleteBookMark } from '../controller/bookMarkController/delete-bookmark';
import { getAllBookMarks } from '../controller/bookMarkController/get-all-bookmark';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BookMark
 *   description: Operations related to managing todo items
 */

/**
 * @swagger
 * /api/v1/add-bookmark:
 *   post:
 *     tags:
 *       - BookMark
 *     summary: Add a bookmark
 *     description: Add a new bookmark entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               directorcast:
 *                 type: string
 *               vote_count:
 *                 type: integer
 *               vote_average:
 *                 type: number
 *               tagline:
 *                 type: string
 *               status:
 *                 type: string
 *               cast:
 *                 type: string
 *               director:
 *                 type: string
 *               budget:
 *                 type: integer
 *               genres:
 *                 type: string
 *               keywords:
 *                 type: string
 *               homepage:
 *                 type: string
 *               original_language:
 *                 type: string
 *               original_title:
 *                 type: string
 *               overview:
 *                 type: string
 *               popularity:
 *                 type: number
 *               release_date:
 *                 type: string
 *                 format: date
 *               revenue:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               runtime:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: BookMarked
 */
router.post('/add-bookmark', addBookMark);

/**
 * @swagger
 * /api/v1/delete-bookmark:
 *   delete:
 *     tags:
 *       - BookMark
 *     summary: Delete a Bookmark.
 *     description: Delete a Bookmark by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation.
 *       500:
 *         description: Internal server error.
 */

router.delete('/delete-bookmark', deleteBookMark);


/**
 * @swagger
 * /api/v1/get-all-bookmark:
 *   get:
 *     tags:
 *       - BookMark
 *     summary: Get all Bookmarks.
 *     description: Retrieve all Bookmark for the authenticated user.
 *     parameters:
 *       - in: query
 *         name: pageno
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: revenue
 *         schema:
 *           type: string
 *         description: Revenue.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [revenueasc, revenuedesc]
 *         description: Sort order for revenue. Use 'revenueasc' for ascending order and 'revenuedesc' for descending order.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering by release date.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering by release date.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *       500:
 *         description: Internal server error.
 */


router.get('/get-all-bookmark', getAllBookMarks);

export default router;
