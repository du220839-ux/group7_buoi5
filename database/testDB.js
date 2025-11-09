const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Test tạo 1 user mẫu
    const User = require('./models/User');
    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: '123456'   // Chỉ test, sau này hash mật khẩu
    });

    await user.save();
    console.log('✅ User test đã được lưu vào DB');

    process.exit(0);
  } catch (error) {
    console.error('❌ Kết nối DB thất bại:', error.message);
    process.exit(1);
  }
};

connectDB();
