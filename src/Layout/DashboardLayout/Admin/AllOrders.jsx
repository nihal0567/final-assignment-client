import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Components/Loading";

import moment from "moment";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, approved, rejected

  // Fetch all orders with optional filter
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["allOrders", filterStatus],
    queryFn: async () => {
      const url = filterStatus === "all" ? "/orders" : `/orders?status=${filterStatus}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  // Open details modal
  const openDetails = (order) => {
    setSelectedOrder(order);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          All <span className="text-amber-400">Orders</span> ({orders.length})
        </h1>

        {/* Filter Section */}
        <div className="flex justify-center mb-8">
          <div className="join">
            <button
              className={`btn join-item ${filterStatus === "all" ? "btn-active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`btn join-item ${filterStatus === "pending" ? "btn-active" : ""}`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className={`btn join-item ${filterStatus === "approved" ? "btn-active" : ""}`}
              onClick={() => setFilterStatus("approved")}
            >
              Approved
            </button>
            <button
              className={`btn join-item ${filterStatus === "rejected" ? "btn-active" : ""}`}
              onClick={() => setFilterStatus("rejected")}
            >
              Rejected
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            কোনো Order নেই এই ফিল্টারে
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/50">
                    <td className="font-mono">{order._id.slice(-8)}</td>
                    <td>{order.email}</td>
                    <td>{order.productTitle || "N/A"}</td>
                    <td>{order.orderQuantity || 0}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "Approved"
                            ? "badge-success"
                            : order.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => openDetails(order)}
                        className="btn btn-info btn-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <dialog id="order-details-modal" className="modal modal-open">
            <div className="modal-box bg-slate-900 text-white rounded-3xl max-w-2xl">
              <h3 className="font-bold text-2xl mb-6 text-amber-300">
                Order Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                  <p><strong>User Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Product:</strong> {selectedOrder.productTitle}</p>
                  <p><strong>Quantity:</strong> {selectedOrder.orderQuantity}</p>
                  <p><strong>Total Price:</strong> ৳{selectedOrder.orderPrice?.toFixed(2)}</p>
                  <p><strong>Order Date:</strong>{" "}
                    {moment(selectedOrder.createdAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                </div>

                <div className="space-y-3">
                  <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
                  <p><strong>Contact:</strong> {selectedOrder.contactNumber}</p>
                  <p><strong>Notes:</strong> {selectedOrder.notes || "N/A"}</p>
                </div>
              </div>

              {/* Tracking Timeline */}
              <h4 className="text-xl font-semibold mb-4 text-amber-300">
                Tracking Timeline
              </h4>
              {selectedOrder.trackingUpdates?.length > 0 ? (
                <div className="space-y-4">
                  {selectedOrder.trackingUpdates
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                    .map((update, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-amber-400 pl-4 py-2 bg-slate-800/50 rounded-lg"
                      >
                        <p className="font-semibold text-lg">{update.status}</p>
                        <p className="text-sm text-gray-400">
                          {moment(update.updatedAt).format("DD MMM YYYY, hh:mm A")}
                        </p>
                        <p className="text-gray-300">{update.location}</p>
                        {update.note && (
                          <p className="text-gray-400 italic">Note: {update.note}</p>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-400">কোনো tracking update নেই এখনও</p>
              )}

              <div className="modal-action mt-8">
                <button
                  className="btn btn-neutral"
                  onClick={() => setSelectedOrder(null)}
                >
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

export default AllOrders;