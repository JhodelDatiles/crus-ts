import React from "react";
import type { IUser } from "../../interfaces/user.interfaces";

interface DeleteUserModalProps {
  user: IUser | null;
  onDelete: (id: string) => Promise<void>; // Simplified signature
}

const DeleteUserModal = ({ user, onDelete }: DeleteUserModalProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) return;

    await onDelete(user._id); // Only pass the ID string
    closeModal();
  };

  const closeModal = () => {
    (document.getElementById("delete_user_modal") as HTMLDialogElement).close();
  };

  return (
    <dialog id="delete_user_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold text-error">Delete User</h3>
        <p className="py-4">
          Are you sure you want to delete{" "}
          <strong>{user?.gmail || "this user"}</strong>? This action cannot be
          undone.
        </p>
        <form onSubmit={handleSubmit} className="modal-action">
          <button type="button" className="btn" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="btn btn-error">
            Confirm Delete
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default DeleteUserModal;
