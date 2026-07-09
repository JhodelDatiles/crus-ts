import React, { useState, useEffect } from "react";
import type { IUser } from "../../interfaces/user.interfaces";

interface UpdateUserModalProps {
  user: IUser | null;
  onUpdate: (id: string, user: Partial<IUser>) => Promise<void>;
}

const UpdateUserModal = ({ user, onUpdate }: UpdateUserModalProps) => {
  const [gmail, setGmail] = useState("");

  useEffect(() => {
    if (user) {
      setGmail(user.gmail || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) return;

    await onUpdate(user._id, {
      gmail,
    });

    (document.getElementById("update_user_modal") as HTMLDialogElement).close();
  };

  return (
    <dialog id="update_user_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update User</h3>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="email"
            className="input input-bordered w-full"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-warning">
              Update
            </button>

            <button
              type="button"
              className="btn"
              onClick={() =>
                // FIXED: Removed the trailing comma inside getElementById
                (document.getElementById("update_user_modal") as HTMLDialogElement).close()
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateUserModal;