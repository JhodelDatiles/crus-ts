import React, { useState } from "react";
import type { IUser } from "../../interfaces/user.interfaces";

interface CreateUserModalProps {
  onCreate: (user: IUser) => Promise<void>;
}

const CreateUserModal = ({ onCreate }: CreateUserModalProps) => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onCreate({
      gmail,
      password,
    });

    setGmail("");
    setPassword("");

    (
      document.getElementById("create_user_modal") as HTMLDialogElement
    ).close();
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById(
              "create_user_modal"
            ) as HTMLDialogElement
          ).showModal()
        }
      >
        Create User
      </button>

      <dialog id="create_user_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold mb-4">Create User</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Create
              </button>

              <button
                type="button"
                className="btn"
                onClick={() =>
                  (
                    document.getElementById(
                      "create_user_modal"
                    ) as HTMLDialogElement
                  ).close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateUserModal;