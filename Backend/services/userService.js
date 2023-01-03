const User = require("../models/User.js");

async function registerUser(email, hashedPassword) {
  try {
    const user = new User({
      email,
      hashedPassword,
      role: "user",
    });

    await user.save();
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByEmail(email) {
  try {
    const pattern = new RegExp(`^${email}$`, "i");
    const user = await User.findOne({ email: { $regex: pattern } });
    return user;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No such user" });
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).populate("bookedHotels").lean();
    return user;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "No such user" });
  }
}

async function getAllUsers() {
  try {
    const users = await User.find().lean();
    return users;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "No such user" });
  }
}

async function updateUser(id, userData) {
  try {
    const user = await User.findById(id);
    user.email = userData.email;
    user.hashedPassword = userData.password;
    user.role = userData.role;

    await user.save();
    return user;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "No such user" });
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "No such user" });
  }
}

async function addNewUser(userData) {
  try {
    const user = new User({
      email: userData.email.trim(),
      role: userData.role,
    });

    await user.save();
    return user;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "No such user" });
  }
}

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  addNewUser,
};
