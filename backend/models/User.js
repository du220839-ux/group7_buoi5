const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// ✅ phải tạo model riêng, rồi export đúng cách
const User = mongoose.model('User', userSchema);

module.exports = User;
