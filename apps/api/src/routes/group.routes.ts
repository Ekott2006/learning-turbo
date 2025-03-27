import {Response, Router} from 'express';
import {getGroups} from '../services/group.services';

const groupRouter: Router = Router();

// Get all groups
groupRouter.get('/', async (_, res: Response) => {
    const groups = await getGroups();
    res.json(groups);
});


export default groupRouter;