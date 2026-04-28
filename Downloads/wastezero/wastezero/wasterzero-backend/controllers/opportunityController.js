const Opportunity = require("../models/Opportunity");

// CREATE OPPORTUNITY (Admin only)
exports.createOpportunity = async (req, res) => {
  try {
    const { title, description, requiredSkills, duration, location } = req.body;

    const opportunity = new Opportunity({
      title,
      description,
      requiredSkills,
      duration,
      location,
      ngo_id: req.user.id
    });

    await opportunity.save();

    res.status(201).json({
      message: "Opportunity created successfully",
      opportunity
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL OPPORTUNITIES (Volunteer view)
exports.getOpportunities = async (req, res) => {
  try {

    const opportunities = await Opportunity.find({
      status: "open",
      isDeleted: false
    }).populate("ngo_id", "name email location");

    res.json(opportunities);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOpportunity = async (req, res) => {

  try {

    const { id } = req.params;

    const opportunity = await Opportunity.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    res.json({
      message: "Opportunity deleted successfully",
      opportunity
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.updateOpportunity = async (req, res) => {
  try {

    const { id } = req.params;

    const opportunity = await Opportunity.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Opportunity updated successfully",
      opportunity
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};