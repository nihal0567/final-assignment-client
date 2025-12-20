import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Loading from "../../../Components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import moment from "moment";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch user's orders
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Open details modal
  const openDetails = (order) => {
    setSelectedOrder(order);
  };

  // Handle Cancel Order
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "অর্ডার Cancel করবেন?",
      text: "একবার Cancel করলে ফিরে আসা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, Cancel",
      cancelButtonText: "না",
      confirmButtonColor: "#ef4444",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/orders/${id}`, {
          status: "Cancelled",
          cancelledAt: new Date(),
        });

        if (res.data.modifiedCount > 0) {
          toast.success("অর্ডার Cancel হয়েছে!");
          refetch();
        }
      } catch (err) {
        toast.error("Cancel করতে ব্যর্থ");
        console.error(err);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          My <span className="text-amber-400">Orders</span> ({orders.length})
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            আপনার কোনো অর্ডার নেই এখনও
          </div>
        ) : (
          <div className="overflow-x-auto bg-slate-900 rounded-3xl shadow-2xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-slate-800 text-amber-300 text-lg">
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/50">
                    <td className="font-mono">{order._id.slice(-8)}</td>
                    <td>{order.productTitle || "N/A"}</td>
                    <td>{order.orderQuantity || 0}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "Approved"
                            ? "badge-success"
                            : order.status === "Rejected" || order.status === "Cancelled"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          order.paymentStatus === "paid"
                            ? "badge-success"
                            : order.paymentStatus === "cod"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {order.paymentStatus === "cod"
                          ? "Cash on Delivery"
                          : order.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => openDetails(order)} // এখানে modal খুলবে
                        className="btn btn-info btn-sm"
                      >
                        View
                      </button>

                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-error btn-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Details & Tracking Modal */}
        {selectedOrder && (
          <dialog id="order-details-modal" className="modal modal-open">
            <div className="modal-box bg-slate-900 text-white rounded-3xl max-w-3xl">
              <h3 className="font-bold text-2xl mb-6 text-amber-300">
                Order Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                  <p><strong>Product:</strong> {selectedOrder.productTitle}</p>
                  <p><strong>Quantity:</strong> {selectedOrder.orderQuantity}</p>
                  <p><strong>Total Price:</strong> ৳{selectedOrder.orderPrice?.toFixed(2)}</p>
                  <p><strong>Order Date:</strong>{" "}
                    {moment(selectedOrder.createdAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                  <p><strong>Payment:</strong> {selectedOrder.paymentStatus}</p>
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

export default MyOrders;