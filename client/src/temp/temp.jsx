import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", birthDate: "" });

  useEffect(() => {
    fetch("http://localhost:4000/get")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Add new user
  const addUser = () => {
    fetch("http://localhost:4000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((newData) => setData((prev) => [...prev, newData]))
      .catch(console.error);
  };

  // Update existing user
  const updateUser = (id) => {
    fetch(`http://localhost:4000/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((updatedUser) =>
        setData((prev) =>
          prev.map((user) => (user._id === id ? updatedUser : user))
        )
      )
      .catch(console.error);
  };

  // Delete user
  const deleteUser = (id) => {
    fetch(`http://localhost:4000/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => setData((prev) => prev.filter((user) => user._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>All Users</h2>
      {data.map((user) => (
        <div key={user._id}>
          <h3>{user.username}</h3>
          <h3>{user.birthDate}</h3>
          <button onClick={() => updateUser(user._id)}>Edit</button>
          <button onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="date"
        value={newUser.birthDate}
        onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default App;
