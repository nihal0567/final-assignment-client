import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaCheck, FaClock, FaBox, FaTag } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";

const ProductDetails = () => {
  const { loading, user } = useAuth()
  const { id } = useParams();
  const [product, setProduct] = useState(null);



  const currentUser = { role: "buyer", status: "approved" }; // "buyer", "manager", null


  useEffect(() => {
    fetch(`http://localhost:9000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.result);
      })

  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-950 text-amber-400 flex items-center justify-center text-2xl">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center text-2xl">Product Loading...</div>;

  const canOrder = currentUser?.role === "buyer" && currentUser?.status === "approved";
  if (loading) {
    return <Loading />
  }
  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-5">
      <div className="max-w-5xl mx-auto">

        {/* Main Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left: Image + Video */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={product.productImages || "https://images.unsplash.com/photo-1523381294911-8d669ab86a83?w=800"}
                alt={product.productName}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            {/* Video (যদি থাকে) */}
            {product.videoURL && (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src={product.videoURL}
                  title="Product Video"
                  className="w-full h-64 md:h-80"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">

            {/* Category */}
            <span className="inline-block bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-bold">
              {product.productOption || "Garments"}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white">
              {product.productName}
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {product.productDesc || "High-quality ready-made garment. Export standard. Available for bulk order."}
            </p>

            {/* Info List */}
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-4">
                <FaTag className="text-amber-400" />
                <span>Price:</span>
                <span className="text-3xl font-bold text-cyan-400">৳{product.productPrice}</span>
                <span className="text-gray-500 text-sm">per piece</span>
              </div>

              <div className="flex items-center gap-4">
                <FaBox className="text-green-400" />
                <span>Available:</span>
                <span className={`font-bold ${product.quantity > 100 ? "text-green-400" : "text-orange-400"}`}>
                  {product.productQuantity} pcs
                </span>
              </div>

              <div className="flex items-center gap-4">
                <FaCheck className="text-amber-400" />
                <span>Minimum Order:</span>
                <span className="font-bold text-amber-300">{product.minOrderQuantity || 500} pcs</span>
              </div>

              <div className="flex items-center gap-4">
                <FaClock className="text-purple-400" />
                <span>Lead Time:</span>
                <span className="font-bold text-purple-300">{product.leadTime || "25-35 days"}</span>
              </div>
            </div>

            {/* Payment Options */}
            {product.paymentOptions && (
              <div>
                <p className="text-gray-400 mb-2">Payment Options:</p>
                <div className="flex flex-wrap gap-2">
                  {product.paymentOptions.map((opt, i) => (
                    <span key={i} className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {
              user && <div className="pt-6 flex flex-col gap-2">
                {canOrder ? (
                  <Link to="/booking-form">
                    <button className="w-full bg-gradient-to-r from-amber-500 cursor-pointer to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xl py-5 rounded-xl shadow-xl 
                    transform hover:scale-105 transition">
                      Place Order / Book Now
                    </button>
                  </Link>
                ) : ""}

                {/* WhatsApp */}
                {/* <a
                  href={`https://wa.me/8801877123456?text=Hi! I'm interested in ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-5 rounded-xl flex items-center justify-center gap-3 shadow-xl"
                >
                  <FaWhatsapp size={28} /> Chat on WhatsApp
                </a> */}
              </div>
            }

            {/* Back */}
            <Link to="/all-product" className="text-amber-400 hover:text-amber-300 inline-block mt-6">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;