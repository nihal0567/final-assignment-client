import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // Filter products by name (optional search)
  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle toggle "Show on Home"
  const handleToggleHome = async (id, currentShowOnHome) => {
    const newValue = !currentShowOnHome;

    try {
      const res = await axiosSecure.patch(`/products/${id}`, {
        showOnHome: newValue,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`প্রোডাক্ট ${newValue ? "Home-এ দেখানো হবে" : "Home থেকে সরানো হয়েছে"}`);
        refetch();
      }
    } catch (err) {
      toast.error("Toggle করতে ব্যর্থ");
      console.error(err);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "প্রোডাক্ট ডিলিট করবেন?",
      text: "একবার ডিলিট করলে ফিরে আসা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট",
      cancelButtonText: "না",
      confirmButtonColor: "#ef4444",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("প্রোডাক্ট ডিলিট হয়েছে!");
          refetch();
        }
      } catch (err) {
        toast.error("ডিলিট করতে ব্যর্থ");
        console.error(err);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          All <span className="text-amber-400">Products</span> ({products.length})
        </h1>

        {/* Search Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="প্রোডাক্টের নাম সার্চ করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full max-w-md bg-slate-800 text-white"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            কোনো প্রোডাক্ট পাওয়া যায়নি
          </div>
        ) : (
          <div className="overflow-x-auto bg-slate-900 rounded-3xl shadow-2xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-slate-800 text-amber-300 text-lg">
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Created By</th>
                  <th>Show on Home</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-800/50">
                    <td>
                      {product.productImages?.[0] ? (
                        <img
                          src={product.productImages[0]}
                          alt={product.productName}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{product.productName || "N/A"}</td>
                    <td>৳{product.productPrice?.toFixed(2) || 0}</td>
                    <td>{product.category || "N/A"}</td>
                    <td>{product.email || "Unknown"}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={product.showOnHome || false}
                        onChange={() => handleToggleHome(product._id, product.showOnHome)}
                        className="checkbox checkbox-primary"
                      />
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;