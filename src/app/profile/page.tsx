"use client";

import { useEffect, useState } from "react";
import { User, UpdateProfileInput } from "@/app/lib/types/user";
import { updateUserProfile } from "@/app/lib/api/user";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { FaPen } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "../../../constants";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UpdateProfileInput>>({});

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY); // 🧹 Clear token
    localStorage.removeItem("user");
    router.replace("/"); // 🔁 Redirect to login
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("❌ Failed to parse user", err);
      }
    }
  }, []);

  if (!user) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md relative">
        {/* 🔙 Back Button */}
        <button
          onClick={() => router.back()} // or router.push("/dashboard") for a specific route
          className="absolute top-8 left-4 flex items-center gap-2 text-sm text-gray-900 hover:text-indigo-600 transition cursor-pointer"
        >
          <IoArrowBackCircleSharp className="text-2xl sm:text-4xl" />
          <span>Back</span>
        </button>
        {/* Avatar */}
        <div className="w-10 h-10 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 relative">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl sm:text-3xl font-bold shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mb-3 sm:mb-6">
          <p className="text-sm sm:text-xl font-semibold text-gray-900">
            {user.name}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {!isEditing && (
          <>
            {/* User Details List */}
            <div className="rounded-xl border border-blue-200 divide-y divide-blue-100 overflow-hidden text-sm shadow-sm bg-white">
              {user.age && (
                <DetailRow label="Age" value={`${user.age} years`} />
              )}
              {user.gender && <DetailRow label="Gender" value={user.gender} />}
              {user.marital_status && (
                <DetailRow label="Marital Status" value={user.marital_status} />
              )}
              {user.weight && (
                <DetailRow label="Weight" value={`${user.weight} kg`} />
              )}
              {user.height && (
                <DetailRow label="Height" value={`${user.height} cm`} />
              )}
              {user.blood_group && (
                <DetailRow label="Blood Group" value={user.blood_group} />
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(true);
                }}
              >
                Edit
                <FaPen className="text-sm" />
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}
        {/* Editing Form */}
        {isEditing && (
          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const updated = await updateUserProfile(formData);
                localStorage.setItem("user", JSON.stringify(updated));
                setUser(updated);
                setIsEditing(false);
              } catch (err) {
                console.error("Update failed", err);
              }
            }}
          >
            {/* Marital Status Dropdown */}
            <Select
              label="Marital Status"
              name="marital_status"
              value={formData.marital_status || ""}
              onChange={(e) =>
                setFormData({ ...formData, marital_status: e.target.value })
              }
              options={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
              ]}
            />

            {/* Age Input */}
            <div className="space-y-1">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <Input
                id="age"
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="New Password (optional)"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            {/* Action Buttons */}
            <div className="flex gap-1 sm:gap-4 justify-center">
              <Button type="submit" variant="primary" size="sm">
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

// Subcomponent for detail rows
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="px-4 py-3 flex justify-between items-center bg-white hover:bg-blue-50 transition">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default ProfilePage;
