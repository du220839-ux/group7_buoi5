const User = require('../models/User');

// Get Profile
exports.getProfile = async (req,res)=>{
  res.json(req.user);
};

// Update Profile
exports.updateProfile = async (req,res)=>{
  const { name, password, avatar } = req.body;
  if(name) req.user.name = name;
  if(password) req.user.password = password;
  if(avatar) req.user.avatar = avatar;
  await req.user.save();
  res.json({ message:"Profile updated", user:req.user });
};

// Get all users (Admin)
exports.getUsers = async (req,res)=>{
  const users = await User.find().select('-password');
  res.json(users);
};

// Delete user
exports.deleteUser = async (req,res)=>{
  const { id } = req.params;
  if(req.user.role !== "Admin" && req.user._id.toString() !== id)
    return res.status(403).json({ message:"Access denied" });
  await User.findByIdAndDelete(id);
  res.json({ message:"User deleted" });
};
