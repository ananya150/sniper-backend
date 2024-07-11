import { Router } from "express";
import * as TokensController from "../controllers/tokensController";

const router = Router();
router.post('/test', TokensController.testRoute);
router.post('/remove', TokensController.removeToken);



export const listen = TokensController.listenToTokens;
export default router;