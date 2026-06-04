import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("");


  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["allProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      return res.data;
    },
  });

  // ✅ safer filter
  const filteredProducts = products.filter((product) =>
    product?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleToggleHome = async (id, currentShowOnHome) => {
    try {
      const res = await axiosSecure.patch(`/products/${id}`, {
        showOnHome: !currentShowOnHome,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Updated successfully");
        refetch();
      }
    } catch {
      toast.error("Toggle failed"); // ✅ fixed
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure to delete this product?",
      text: "You never be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Deleted!");
          refetch();
        }
      } catch {
        toast.error("Delete failed");
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

        {/* Search */}
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
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Created By</th>
                  <th>Home</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="bg-slate-800/40">

                    {/* Image */}
                    <td>
                      {product?.productImages?.[0] ? (
                        <img
                          src={product.productImages[0]}
                          alt="product"
                          className="w-16 h-16 rounded object-cover"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    {/* Name */}
                    <td>{product?.productName || "N/A"}</td>

                    {/* Price */}
                    <td>
                      ৳
                      {product?.productPrice
                        ? Number(product.productPrice).toFixed(2)
                        : "0.00"}
                    </td>

                    {/* Category */}
                    <td>{product?.category || "N/A"}</td>

                    {/* User */}
                    <td>{user?.email || "Unknown"}</td>

                    {/* Toggle */}
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={product?.showOnHome || false}
                        onChange={() =>
                          handleToggleHome(
                            product._id,
                            product?.showOnHome
                          )
                        }
                      />
                    </td>

                    {/* Actions */}
                    <td className="space-x-2">
                      <Link
                        to={`/dashboard/update-products/${product._id}`}
                        className="btn btn-sm btn-primary mr-2"
                      >
                        Update
                      </Link>

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