import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { BASE_URL } from "../../baseurl";
import { logout_user } from "../../Redux/Authantication/auth.action";
import "./adminProduct.css";

const emptyUser = {
  number: "",
  user_name: "",
  password: "",
  email: "",
  dob: "",
  gender: "",
  marital_status: "",
  role: "user",
};

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(emptyUser);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTheme = useColorModeValue("light", "dark");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
    } catch (requestError) {
      setError("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const selectUser = (selectedUser) => {
    setUser({
      ...emptyUser,
      ...selectedUser,
      marital_status: selectedUser.marital_status || "",
    });
    setMessage("");
    setError("");
    setIsModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((currentUser) => ({ ...currentUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.id) {
      setError("Select a user before saving.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.patch(`${BASE_URL}/users/${user.id}`, user);
      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === response.data.id ? response.data : currentUser,
        ),
      );
      setUser(response.data);
      setMessage("User information updated.");
    } catch (requestError) {
      setError("Unable to update user information.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adminProductMain">
      <div className="adminSideBr">
        <h1><Link to="/admin">Home</Link></h1>
        <h1><Link to="/admin/adminflight">Add Flight</Link></h1>
        <h1><Link to="/admin/adminstay">Add Stays</Link></h1>
        <h1><Link to="/admin/flights">All Flights</Link></h1>
        <h1><Link to="/admin/hotels">All Hotels</Link></h1>
        <h1><Link to="/admin/users">Users</Link></h1>
        <h1><Link to="/" onClick={() => dispatch(logout_user)}>Log out</Link></h1>
      </div>

      <div className="adminProductbox">
        <div className="head"><h1>Manage Users</h1></div>
        {loading && <p>Loading users...</p>}
        {error && <p role="alert">{error}</p>}
        {message && <p>{message}</p>}

        {!loading && users.map((currentUser) => (
        <div
          key={currentUser.id}
          className="adminProductlist adminUserRow"
          role="button"
          tabIndex={0}
          onClick={() => selectUser(currentUser)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              selectUser(currentUser);
            }
          }}
        >
          <span>{currentUser.user_name || "Unnamed user"}</span>
          <span>{currentUser.number}</span>
          <span>{currentUser.email || "No email"}</span>
          <span>{currentUser.role || "user"}</span>
        </div>
        ))}

      </div>
      {isModalOpen && (
        <div
        className="adminUserModalBackdrop"
        role="presentation"
        onClick={() => setIsModalOpen(false)}
        >
        <div
          className={`adminUserModal ${modalTheme}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-user-title"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="adminUserModalHeader">
            <h2 id="edit-user-title">Edit User</h2>
            <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="adminUserModalFields">
              <label htmlFor="user_name">Name</label>
              <input id="user_name" name="user_name" value={user.user_name} onChange={handleChange} />
              <label htmlFor="number">Phone</label>
              <input id="number" name="number" value={user.number} onChange={handleChange} />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={user.email} onChange={handleChange} />
              <label htmlFor="dob">Date of birth</label>
              <input id="dob" name="dob" value={user.dob} onChange={handleChange} />
              <label htmlFor="gender">Gender</label>
              <input id="gender" name="gender" value={user.gender} onChange={handleChange} />
              <label htmlFor="marital_status">Marital status</label>
              <input id="marital_status" name="marital_status" value={user.marital_status} onChange={handleChange} />
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={user.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <p role="alert">{error}</p>}
            {message && <p>{message}</p>}
            <div className="adminUserModalActions">
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save User"}
              </button>
            </div>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};
