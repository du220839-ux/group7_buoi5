const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ tránh email trùng
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  avatar: {
    type: String, // URL ảnh đại diện
  },
}, { timestamps: true });

// Hash password trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Tạo model và export
const User = mongoose.model('User', userSchema);
module.exports = User;
=======
  name: { type: String, required: true },          // Tên người dùng
  email: { type: String, required: true, unique: true }, // Email duy nhất
  password: { type: String, required: true },      // Mật khẩu đã hash
  avatar: { type: String, default: '' },           // Link avatar
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Phân quyền
  resetToken: { type: String },                    // Token reset password
  resetTokenExp: { type: Date }                    // Thời hạn token reset
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
>>>>>>> database
