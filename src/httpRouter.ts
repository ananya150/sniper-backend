import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api', (req: Request, res: Response) => {
  res.send('Hello from HTTP endpoint!');
});

export default router;