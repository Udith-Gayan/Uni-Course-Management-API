import {Router} from 'express';

const router = Router();

router.get('/api/teacher', (req, res) => {
    return res.status(200).send({ message: 'Hello Teacher' });
  });

export default router;