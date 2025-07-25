import express from 'express';

const urlRouter = express.Router();
import {handleShortURL, redirect, getanalytics} from '../controller/url.js'

urlRouter.post('/', handleShortURL);

urlRouter.get('/:shortID', redirect);

urlRouter.get('/analytics/:shortID', getanalytics)

export default urlRouter;