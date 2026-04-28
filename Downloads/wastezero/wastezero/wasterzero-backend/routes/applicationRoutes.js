const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const applicationController = require("../controllers/applicationController");


// Volunteer Apply
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("volunteer"),
  applicationController.applyOpportunity
);


// Admin View Applications
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  applicationController.getApplications
);


// Admin Accept / Reject Application
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  applicationController.updateApplicationStatus
);

module.exports = router;