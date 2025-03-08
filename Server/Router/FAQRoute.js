import express from "express"
import { getAllFAQs, searchFAQs , addFAQ} from "../Controller/FAQcontroller.js";
const router = express.Router();

// Fetch all FAQs
router.get("/getfaqs",getAllFAQs);

// Search FAQs
router.get("/faqs/search",searchFAQs);

// Add a new FAQ
router.post("/faqs",addFAQ);

export default router;