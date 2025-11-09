const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Tên người dùng
  email: { type: String, required: true, unique: true }, // Email duy nhất
  password: { type: String, required: true },      // Mật khẩu đã hash
  avatar: { type: String, default: '' },           // Link avatar
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Phân quyền
  resetToken: { type: String },                    // Token reset password
  resetTokenExp: { type: Date }                    // Thời hạn token reset
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
