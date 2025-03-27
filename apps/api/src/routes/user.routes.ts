import {Response, Router} from 'express';
import {createUser, getUsers} from '../services/user.services';
import { faker } from '@faker-js/faker';

const userRouter: Router = Router();

// Get all users
userRouter.get('/', async (_, res: Response) => {
    const users = await getUsers();
    res.json(users);
});

userRouter.post('/', async (_, res: Response) => {
    const user = await createUser({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email()
    })
    res.status(201)
    res.json(user);
});

export default userRouter;