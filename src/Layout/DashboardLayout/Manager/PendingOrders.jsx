import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const PendingOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 🔹 Fetch pending orders
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ["pendingOrders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders?status=Pending");
            return res.data;
        }
    });

    // ✅ Approve order
    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: "Approve this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, approve",
        });

        if (result.isConfirmed) {
            await axiosSecure.patch(`/orders/${id}`, {
                status: "Approved",
                approvedAt: new Date()
            });
            refetch();
            Swal.fire("Approved!", "Order has been approved.", "success");
        }
    };

    // ❌ Reject order
    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: "Reject this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject",
        });

        if (result.isConfirmed) {
            await axiosSecure.patch(`/orders/${id}`, {
                status: "Rejected"
            });
            refetch();
            Swal.fire("Rejected!", "Order has been rejected.", "success");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Pending Orders ({orders.length})
            </h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Order Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userName || "N/A"}</td>
                                    <td>{order.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td>
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleApprove(order._id)}
                                            className="btn btn-xs btn-success"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(order._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="btn btn-xs btn-info"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No pending orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 👁️ View Order Modal */}
            {selectedOrder && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">
                            Order Details
                        </h3>

                        <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                        <p><strong>User:</strong> {selectedOrder.userName}</p>
                        <p><strong>Product:</strong> {selectedOrder.productName}</p>
                        <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>

                        <div className="modal-action">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="btn"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingOrders;