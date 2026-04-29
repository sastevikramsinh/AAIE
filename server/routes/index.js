import { Router } from "express";
import healthRouter from "./health.js";
import subscribeRouter from "./subscribe.js";
import contactRouter from "./contact.js";
import statsRouter from "./stats.js";
import workshopsRouter from "./workshops.js";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(subscribeRouter);
apiRouter.use(contactRouter);
apiRouter.use(statsRouter);
apiRouter.use(workshopsRouter);

export default apiRouter;

