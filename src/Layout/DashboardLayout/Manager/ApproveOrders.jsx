import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Components/Loading";
import { toast } from "react-toastify";
import moment from "moment";

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingForm, setTrackingForm] = useState({
    location: "",
    note: "",
    status: "",
    updatedAt: new Date(),
  });

  // Fetch approved orders
  const { data: orders = [], refetch, isLoading } = useQuery({
    queryKey: ["approvedOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders?status=approved");
      return res.data;
    },
  });

  // Open Add Tracking Modal
  const openAddTracking = (order) => {
    setSelectedOrder(order);
    setTrackingForm({
      location: "",
      note: "",
      status: "",
      updatedAt: new Date(),
    });
    setShowTrackingModal(true);
  };

  // Handle tracking form change
  const handleTrackingChange = (e) => {
    const { name, value } = e.target;
    setTrackingForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new tracking update
  const handleAddTracking = async () => {
    if (!trackingForm.location || !trackingForm.status) {
      toast.error("Location এবং Status দিন");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/orders/${selectedOrder._id}`, {
        $push: { trackingUpdates: { ...trackingForm } },
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Tracking update যোগ করা হয়েছে!");
        refetch();
        setShowTrackingModal(false);
        setSelectedOrder(null);
      }
    } catch (err) {
      toast.error("Tracking add করতে ব্যর্থ");
      console.error(err);
    }
  };

  // Open View Tracking Modal
  const openViewTracking = (order) => {
    setSelectedOrder(order);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-12">
          Approved <span className="text-amber-400">Orders</span> ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            কোনো Approved Order নেই
          </div>
        ) : (
          <div className="overflow-x-auto bg-slate-900 rounded-3xl shadow-2xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-slate-800 text-amber-300 text-lg">
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Approved Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/50">
                    <td className="font-mono">{order._id.slice(-8)}</td>
                    <td>{order.email || "N/A"}</td>
                    <td>{order.productTitle || "N/A"}</td>
                    <td>{order.orderQuantity || 0}</td>
                    <td>
                      {order.approvedAt
                        ? moment(order.approvedAt).format("DD MMM YYYY, hh:mm A")
                        : "N/A"}
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => openAddTracking(order)}
                        className="btn btn-primary btn-sm"
                      >
                        Add Tracking
                      </button>
                      <button
                        onClick={() => openViewTracking(order)}
                        className="btn btn-info btn-sm"
                      >
                        View Tracking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Tracking Modal */}
        {showTrackingModal && selectedOrder && (
          <dialog id="add-tracking-modal" className="modal modal-open">
            <div className="modal-box bg-slate-900 text-white rounded-3xl">
              <h3 className="font-bold text-2xl mb-6 text-amber-300">
                Add Tracking Update
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={trackingForm.location}
                    onChange={handleTrackingChange}
                    className="input input-bordered w-full bg-slate-800"
                    placeholder="e.g. Dhaka Warehouse"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select
                    name="status"
                    value={trackingForm.status}
                    onChange={handleTrackingChange}
                    className="select select-bordered w-full bg-slate-800"
                  >
                    <option value="">Select Status</option>
                    <option>Cutting Completed</option>
                    <option>Sewing Started</option>
                    <option>Finishing</option>
                    <option>QC Checked</option>
                    <option>Packed</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Note</label>
                  <textarea
                    name="note"
                    value={trackingForm.note}
                    onChange={handleTrackingChange}
                    className="textarea textarea-bordered w-full bg-slate-800"
                    placeholder="Optional note..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-action mt-6">
                <button className="btn btn-neutral" onClick={() => setShowTrackingModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleAddTracking}>
                  Add Update
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* View Tracking Modal */}
        {selectedOrder && !showTrackingModal && (
          <dialog id="view-tracking-modal" className="modal modal-open">
            <div className="modal-box bg-slate-900 text-white rounded-3xl">
              <h3 className="font-bold text-2xl mb-6 text-amber-300">
                Tracking Timeline
              </h3>
              <div className="space-y-4">
                {selectedOrder.trackingUpdates?.length > 0 ? (
                  <div className="timeline">
                    {selectedOrder.trackingUpdates
                      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                      .map((update, index) => (
                        <div key={index} className="mb-4 border-l-4 border-amber-400 pl-4">
                          <p className="text-lg font-semibold">{update.status}</p>
                          <p className="text-sm text-gray-400">
                            {moment(update.updatedAt).format("DD MMM YYYY, hh:mm A")}
                          </p>
                          <p className="text-gray-300">{update.location}</p>
                          {update.note && <p className="text-gray-400">Note: {update.note}</p>}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-400">কোনো tracking update নেই এখনও</p>
                )}
              </div>
              <div className="modal-action mt-6">
                <button className="btn btn-neutral" onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ApprovedOrders;