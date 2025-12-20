import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Open update modal
  const openUpdateModal = (user) => {
    setSelectedUser(user);
  };

  // Handle role/status update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const role = form.role.value;
    const status = form.status.value;
    let suspendReason = "";
    let suspendFeedback = "";

    if (status === "suspended") {
      const { value: reason } = await Swal.fire({
        title: "Suspend Reason",
        input: "text",
        inputLabel: "কেন suspend করছেন?",
        inputPlaceholder: "Enter suspend reason",
        showCancelButton: true,
        inputValidator: (value) => !value && "Reason দিন!",
      });

      if (!reason) return;

      const { value: feedback } = await Swal.fire({
        title: "Suspend Feedback",
        input: "textarea",
        inputLabel: "User-কে কী বলবেন?",
        inputPlaceholder: "Feedback for the user...",
        showCancelButton: true,
      });

      suspendReason = reason;
      suspendFeedback = feedback || "No feedback provided";
    }

    try {
      const res = await axiosSecure.patch(`/users/${selectedUser._id}`, {
        role,
        status,
        suspendReason,
        suspendFeedback,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("User updated successfully!");
        refetch();
        setSelectedUser(null);
      }
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          Manage <span className="text-amber-400">Users</span> ({users.length})
        </h1>

        <div className="overflow-x-auto bg-slate-900 rounded-3xl shadow-2xl">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-slate-800 text-amber-300 text-lg">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-800/50">
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === "Admin" ? "badge-success" : user.role === "Manager" ? "badge-info" : "badge-warning"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.status === "active" ? "badge-success" : "badge-error"}`}>
                      {user.status || "active"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => openUpdateModal(user)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {selectedUser && (
          <dialog id="update-user-modal" className="modal modal-open">
            <div className="modal-box bg-slate-900 text-white rounded-3xl">
              <h3 className="font-bold text-2xl mb-6 text-amber-300">
                Update User: {selectedUser.name || selectedUser.email}
              </h3>

              <form onSubmit={handleUpdateUser} className="space-y-6">
                {/* Role Select */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Role</label>
                  <select
                    name="role"
                    defaultValue={selectedUser.role}
                    className="select select-bordered w-full bg-slate-800"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Buyer">Buyer</option>
                  </select>
                </div>

                {/* Status Select */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    name="status"
                    defaultValue={selectedUser.status || "active"}
                    className="select select-bordered w-full bg-slate-800"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="modal-action mt-8">
                  <button
                    type="button"
                    className="btn btn-neutral"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;