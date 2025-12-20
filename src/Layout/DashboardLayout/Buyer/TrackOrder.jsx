import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import { toast } from "react-toastify";
import moment from "moment";

const TrackOrder = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch single order
  const { data: order, isLoading, error } = useQuery({
    queryKey: ["trackOrder", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}`);
      return res.data;
    },
    enabled: !!orderId && !!user,
  });

  // Security: Check if order belongs to current user
  if (order && order.email !== user?.email) {
    toast.error("এই অর্ডার আপনার নয়!");
    navigate("/dashboard/my-orders");
    return null;
  }

  if (isLoading) return <Loading />;
  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-red-400">Order not found</h2>
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="btn btn-neutral mt-6"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  // Sort tracking updates (latest first)
  const sortedUpdates = order.trackingUpdates
    ? [...order.trackingUpdates].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      )
    : [];

  const latestStatus = sortedUpdates[0]?.status || "Pending";

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          Track Your <span className="text-amber-400">Order</span>
        </h1>

        {/* Order Summary */}
        <div className="bg-slate-900/80 rounded-3xl p-8 mb-12 shadow-2xl border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="text-xl font-bold">{order._id.slice(-8)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Product</p>
              <p className="text-xl font-bold">{order.productTitle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Status</p>
              <p className="text-xl font-bold text-amber-300">{latestStatus}</p>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <h2 className="text-3xl font-bold text-center mb-10 text-amber-300">
          Tracking Timeline
        </h2>

        {sortedUpdates.length === 0 ? (
          <div className="text-center text-gray-400 text-xl bg-slate-900/80 p-12 rounded-3xl">
            এখনও কোনো tracking update নেই। শীঘ্রই আপডেট হবে!
          </div>
        ) : (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-400"></div>

            <div className="space-y-12">
              {sortedUpdates.map((update, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index === 0 ? "animate-pulse" : ""
                  }`}
                >
                  {/* Left/Right alternation */}
                  <div
                    className={`w-1/2 pr-8 ${
                      index % 2 === 0 ? "text-right" : "text-left ml-auto"
                    }`}
                  >
                    {index % 2 === 0 && (
                      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-amber-400/30">
                        <h3 className="text-xl font-bold text-amber-300 mb-2">
                          {update.status}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {moment(update.updatedAt).format("DD MMM YYYY, hh:mm A")}
                        </p>
                        <p className="text-gray-300">{update.location}</p>
                        {update.note && (
                          <p className="text-gray-400 mt-2 italic">
                            Note: {update.note}
                          </p>
                        )}
                        {update.imageURL && (
                          <img
                            src={update.imageURL}
                            alt="Update"
                            className="mt-4 rounded-lg max-w-full h-48 object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Circle on line */}
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center z-10 shadow-lg">
                    <span className="text-black font-bold">{index + 1}</span>
                  </div>

                  <div className="w-1/2 pl-8">
                    {index % 2 !== 0 && (
                      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-amber-400/30">
                        <h3 className="text-xl font-bold text-amber-300 mb-2">
                          {update.status}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {moment(update.updatedAt).format("DD MMM YYYY, hh:mm A")}
                        </p>
                        <p className="text-gray-300">{update.location}</p>
                        {update.note && (
                          <p className="text-gray-400 mt-2 italic">
                            Note: {update.note}
                          </p>
                        )}
                        {update.imageURL && (
                          <img
                            src={update.imageURL}
                            alt="Update"
                            className="mt-4 rounded-lg max-w-full h-48 object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional Interactive Map (Simple placeholder) */}
        {order.currentLocation && (
          <div className="mt-12 bg-slate-900/80 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center">
              Current Location
            </h3>
            <div className="h-96 bg-slate-800 rounded-xl flex items-center justify-center">
              <p className="text-gray-400">
                Interactive Map Coming Soon (Google Maps integration)
              </p>
            </div>
            <p className="text-center mt-4 text-gray-300">
              Latest known location: {order.currentLocation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;