import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Components/Loading"; // তোমার existing Loading component
import { toast } from "react-toastify";
import moment from "moment"; // npm install moment (optional, date format এর জন্য)

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch pending orders
  const { data: orders = [], refetch, isLoading } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders?status=pending");
      return res.data;
    },
  });

  // Approve order
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "অর্ডার Approve করবেন?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, Approve",
      cancelButtonText: "না",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/orders/${id}`, {
          status: "Approved",
          approvedAt: new Date(),
        });

        if (res.data.modifiedCount > 0) {
          toast.success("অর্ডার Approved হয়েছে!");
          refetch();
        }
      } catch (err) {
        toast.error("Approve করতে ব্যর্থ");
        console.error(err);
      }
    }
  };

  // Reject order
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "অর্ডার Reject করবেন?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, Reject",
      cancelButtonText: "না",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/orders/${id}`, {
          status: "Rejected",
        });

        if (res.data.modifiedCount > 0) {
          toast.success("অর্ডার Rejected হয়েছে!");
          refetch();
        }
      } catch (err) {
        toast.error("Reject করতে ব্যর্থ");
        console.error(err);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-12">
          Pending <span className="text-amber-400">Orders</span> ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            কোনো Pending Order নেই
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
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/50">
                    <td className="font-mono">{order._id.slice(-8)}</td>
                    <td>{order.email || order.userName || "N/A"}</td>
                    <td>{order.productTitle || order.productName || "N/A"}</td>
                    <td>{order.orderQuantity || order.quantity || 0}</td>
                    <td>
                      {order.createdAt || order.orderDate
                        ? moment(order.createdAt || order.orderDate).format(
                            "DD MMM YYYY, hh:mm A"
                          )
                        : "N/A"}
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="btn btn-success btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(order._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => setSelectedOrder(order)}
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

        {/* View Order Modal */}
        {selectedOrder && (
          <dialog id="order-modal" className="modal modal-open">
            <div className="modal-box bg-slate-900 text-white rounded-3xl">
              <h3 className="font-bold text-2xl mb-6 text-amber-300">
                Order Details
              </h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                <p><strong>User Email:</strong> {selectedOrder.email || "N/A"}</p>
                <p><strong>Product:</strong> {selectedOrder.productTitle || selectedOrder.productName || "N/A"}</p>
                <p><strong>Quantity:</strong> {selectedOrder.orderQuantity || selectedOrder.quantity || "N/A"}</p>
                <p><strong>Total Price:</strong> ৳{(selectedOrder.orderPrice || 0).toFixed(2)}</p>
                <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress || "N/A"}</p>
                <p><strong>Contact:</strong> {selectedOrder.contactNumber || "N/A"}</p>
                <p><strong>Order Date:</strong> {moment(selectedOrder.createdAt || selectedOrder.orderDate).format("DD MMM YYYY, hh:mm A")}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Notes:</strong> {selectedOrder.notes || "N/A"}</p>
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

export default PendingOrders;