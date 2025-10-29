import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });

  // Lấy danh sách user
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  // Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  // Bắt đầu sửa user
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditData({ name: user.name, email: user.email });
  };

  // Lưu sau khi sửa
  const handleSave = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, editData);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {editingUser === user._id ? (
              <>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
                <button onClick={() => handleSave(user._id)}>Lưu</button>
                <button onClick={() => setEditingUser(null)}>Hủy</button>
              </>
            ) : (
              <>
                {user.name} - {user.email}{" "}
                <button onClick={() => handleEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete(user._id)}>Xóa</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
