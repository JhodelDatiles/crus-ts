import React, { useState, useEffect } from "react";
import { userAPI } from "../services/user.api.ts";
import toast from "react-hot-toast";
import type { IUser } from "../interfaces/user.interfaces";

const HomePage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);

        const res = await userAPI.getAllUsers();

        if (!res) {
          toast.error("Failed to fetch users data!");
          return;
        }

        if (res.data) {
          setUsers(res.data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-base-content/70">
              Total Users: {users.length}
            </p>
          </div>

          <button className="btn btn-primary">
            + Create User
          </button>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {loading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Gmail</th>
                      <th>Created At</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>

                          <td>{user.gmail}</td>

                          <td>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "-"}
                          </td>

                          <td>
                            <div className="flex justify-center gap-2">
                              <button className="btn btn-sm btn-warning">
                                Update
                              </button>

                              <button className="btn btn-sm btn-error">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-6">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;