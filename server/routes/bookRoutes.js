import express from 'express';
import * as bookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', (req, res) => bookController.getBookByID(parseInt(req.params.id), req, res));
router.post('/', bookController.addBook);
router.put('/:id', (req, res) => bookController.updateBook({ id: parseInt(req.params.id), ...req.body }, req, res));
router.delete('/:id', (req, res) => bookController.deleteBook(parseInt(req.params.id), req, res));

export default router;