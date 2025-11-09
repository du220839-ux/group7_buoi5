const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },                   // Tên người dùng
  email: { type: String, required: true, unique: true },    // Email duy nhất
  password: { type: String, required: true },               // Mật khẩu hash
  avatar: { type: String, default: '' },                    // Link ảnh đại diện
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Phân quyền
  resetToken: { type: String },                              // Token reset password
  resetTokenExp: { type: Date }                              // Hạn token
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
