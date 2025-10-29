import React, { useState } from "react";
import axios from "axios"; // 👈 phải có dòng này

function AddUser({ onUserAdded }) {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!newUser.name.trim()) {
      alert("❌ Tên không được để trống!");
      return;
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(newUser.email)) {
      alert("❌ Email không hợp lệ!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", newUser);
      alert("✅ Thêm user thành công!");
      setNewUser({ name: "", email: "" });
      if (onUserAdded) onUserAdded();
    } catch (err) {
      console.error("❌ Lỗi khi thêm user:", err);
      alert("Đã xảy ra lỗi khi thêm user!");
    }
  };

  return (
    <div>
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={newUser.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;
