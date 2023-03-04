import express from "express";
import { addPoll, votePoll, fetchLastPolls, fetchPollResult, fetchAllPolls} from "../controllers/pollControllers.js";

const router = express.Router();


router.post("/addpoll", addPoll );
router.post("/votepoll", votePoll );
router.get("/fetchLastPolls", fetchLastPolls );
router.get("/fetchAllPolls", fetchAllPolls );
router.post("/fetchpollResult", fetchPollResult );


export default router;