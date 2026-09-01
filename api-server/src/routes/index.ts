import { Router, type IRouter } from "express";
import healthRouter from "./health";
import propertiesRouter from "./properties";
import bookingsRouter from "./bookings";
import inquiriesRouter from "./inquiries";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/properties", propertiesRouter);
router.use("/bookings", bookingsRouter);
router.use("/inquiries", inquiriesRouter);
router.use("/admin", adminRouter);

export default router;
