import React, { useState, useEffect } from "react";
import { userAPI } from "../services/user.api.ts";
import toast from "react-hot-toast";
import type { IUser } from "../interfaces/user.interfaces";
import CreateUserModal from "../components/users/CreateUserModal";
import UpdateUserModal from "../components/users/UpdateUserModal.tsx";
import DeleteUserModal from "../components/users/DeleteUserModal.tsx"; // Kept import

const HomePage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<IUser | null>(null); // State dedicated to deletion

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getAllUsers();
      if (res && res.data) {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (user: IUser) => {
    try {
      await userAPI.createUser(user);
      toast.success("User created!");
      fetchUsers();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpdateUser = async (id: string, updatedUser: Partial<IUser>) => {
    try {
      await userAPI.updateUser(id, updatedUser);
      toast.success("User details updated!");
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await userAPI.deleteUser(id); 
      toast.success("User deleted successfully!");
      fetchUsers();
      setSelectedDeleteUser(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const openUpdateModal = (user: IUser) => {
    setSelectedUser(user);
    (
      document.getElementById("update_user_modal") as HTMLDialogElement
    ).showModal();
  };

  // Added missing open script handler for deletion 
  const openDeleteModal = (user: IUser) => {
    setSelectedDeleteUser(user);
    (
      document.getElementById("delete_user_modal") as HTMLDialogElement
    ).showModal();
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-base-content/70">Total Users: {users.length}</p>
          </div>
          <CreateUserModal onCreate={handleCreateUser} />
        </div>

        {/* Table Card */}
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
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => openUpdateModal(user)}
                              >
                                Edit
                              </button>

                              {/* FIXED: Replaced nested modal with an action trigger button */}
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => openDeleteModal(user)}
                              >
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

      {/* GLOBAL MODALS: Placed safely outside loop context execution */}
      <UpdateUserModal user={selectedUser} onUpdate={handleUpdateUser} />
      <DeleteUserModal user={selectedDeleteUser} onDelete={handleDeleteUser} />
    </div>
  );
};

export default HomePage;