const Application = require("../models/Application");


// Volunteer Apply
exports.applyOpportunity = async (req, res) => {

  try {

    const { opportunity_id } = req.body;
    const volunteer_id = req.user.id;

    const existing = await Application.findOne({
      opportunity_id,
      volunteer_id
    });

    if (existing) {
      return res.status(400).json({
        message: "You already applied"
      });
    }

    const application = new Application({
      opportunity_id,
      volunteer_id
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



// Admin View Applications
exports.getApplications = async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("volunteer_id", "name email")
      .populate("opportunity_id", "title location");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



// Admin Accept / Reject
exports.updateApplicationStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Application status updated",
      application
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};