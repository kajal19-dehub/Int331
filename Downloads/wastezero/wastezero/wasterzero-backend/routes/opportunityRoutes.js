const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const opportunityController = require("../controllers/opportunityController");

// Create opportunity (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  opportunityController.createOpportunity
);

// Get opportunities (Volunteer view)
router.get(
  "/",
  authMiddleware,
  opportunityController.getOpportunities
);

module.exports = router;

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  opportunityController.deleteOpportunity
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  opportunityController.updateOpportunity
);