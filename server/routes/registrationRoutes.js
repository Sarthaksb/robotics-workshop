import express from "express";
import { submitRegistration } from "../controllers/registrationController.js";

export default function(validationMiddleware) {
  const router = express.Router();
  
  // POST /api/enquiry
  router.post("/enquiry", validationMiddleware, submitRegistration);
  
  return router;
}
