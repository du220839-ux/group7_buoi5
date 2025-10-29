const User = require('../models/User'); // đường dẫn phải chính xác

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log("📦 req.body:", req.body); // kiểm tra body
    const newUser = new User({ name, email }); // ← lỗi ở đây nếu User undefined
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
