import { useEffect, useState } from "react";
import API from "../../utils/axios";

export default function Profile() {
  const [user, setUser] = useState({ first_name: "", last_name: "", username: "" });

  useEffect(() => {
    API.get("/user/profile/")
      .then((res) => setUser(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    API.put("/user/profile/", user)
      .then(() => alert("Profile updated"))
      .catch(() => alert("Failed to update profile"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-lg space-y-4">
      <input
        name="first_name"
        value={user.first_name}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
        placeholder="First Name"
      />
      <input
        name="last_name"
        value={user.last_name}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
        placeholder="Last Name"
      />
      <input
        name="username"
        value={user.username}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
        placeholder="Username"
        disabled
      />
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
