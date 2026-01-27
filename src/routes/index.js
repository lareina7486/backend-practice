import express from 'express';
import studyRouter from './studies/index.js';

const router = express.Router();

router.use('/studies', studyRouter);
router.use('/habits')

export default router;


export const logger = (req, res, next) => {