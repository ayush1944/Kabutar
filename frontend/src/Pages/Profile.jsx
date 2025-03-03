import React, { useState } from "react";

const UserProfile = () => {
  // Default User Data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  });

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save Changes
  const handleSave = () => {
    setEditMode(false);
    alert("Profile Updated!");
  };

  // Logout Functionality
  const handleLogout = () => {
    alert("Logged Out Successfully!");
    window.location.reload(); // Refresh page to simulate logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-700 rounded">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-700 rounded">{user.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              {editMode ? (
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-700 rounded">
                  {showPassword ? user.password : "••••••••"}
                </p>
              )}
              <button
                onClick={() => editMode && setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                disabled={!editMode}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
  