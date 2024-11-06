const User = require("../model/user");
const teamlead = require("../model/TeamLead");
const escalation = require("../model/Escalation");
const evaluation = require("../model/Evaluation");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      name: req.body.name,
    };
    const details = await User(data);
    await details.save();
    res.status(202).json({ details, message: "created", success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        userEmail: user.email,
      },
      process.env.JWT_TOKEN
    );
    res
      .status(200)
      .json({ message: "Login successful", user, token, success: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchUser = async (req, res) => {
  try {
    const user = await User.find()
      .select("-password")
      .populate("evaluationRating");
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("escalationdetail")
      .populate("evaluationRating");
    const counts = {
      average: 0,
      good: 0,
      bad: 0,
      total: 0,
    };

    user.escalationdetail.forEach((entry) => {
      counts[entry.userrating]++;
      counts["total"] = counts.average + counts.good + counts.bad;
    });
    counts["total"] = counts.average + counts.good + counts.bad;
    res.status(200).json({ user, counts, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const escaltionDetails = await escalation.find({
      agentName: `${req.params.name}`,
    });
    const evaluationDetails = await evaluation.find({
      agentName: `${req.params.name}`,
    });
    const counts = {
      average: 0,
      good: 0,
      bad: 0,
      total: 0,
    };

    escaltionDetails.forEach((entry) => {
      counts[entry.userrating]++;
      counts["total"] = counts.average + counts.good + counts.bad;
    });

    res.status(200).json({
      esc: escaltionDetails,
      ev: evaluationDetails,
      counts,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addLeader = async (req, res) => {
  try {
    const data = {
      leadName: req.body.leadname,
    };
    const details = await teamlead(data);
    await details.save();
    res.status(202).json({ details, success: true, message: "created" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", success: false });
  }
};

exports.deleteLeader = async (req, res) => {
  try {
    await teamlead.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

exports.fetchTeamLead = async (req, res) => {
  try {
    const data = await teamlead.find();
    res.json({ data, success: true });
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "logout!",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
