const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('../utils/cloudinary');

// ----------------- SIGN UP -----------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    // Tạo user mới (password sẽ tự hash nhờ pre save)
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- LOGIN -----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user tồn tại
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email hoặc password không đúng" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Email hoặc password không đúng" });

    // Tạo JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- LOGOUT -----------------
exports.logout = async (req, res) => {
  // Với JWT, logout chỉ cần xóa token phía client
  res.json({ message: "Logout successful" });
};

// ----------------- FORGOT PASSWORD -----------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại" });

    // Tạo reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    // Gửi email
    await sendEmail(user.email, "Reset Password", `Click link để reset password: ${resetLink}`);

    res.json({ message: "Reset password link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- RESET PASSWORD -----------------
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password; // password sẽ auto hash nhờ pre save
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// ----------------- UPLOAD AVATAR -----------------
exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Upload file lên Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "avatars" });

    user.avatar = result.secure_url;
    await user.save();

    res.json({ message: "Avatar uploaded successfully", avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
