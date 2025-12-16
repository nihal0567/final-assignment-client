import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageProducts = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: products = [], refetch } = useQuery({
        queryKey: ['manageProducts', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data;
        }
    })

    const productDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                .then(res =>{
                    console.log(res.data);
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "this file has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Products {products.length} </h2>

            <input
                type="text"
                placeholder="Search by product name"
                className="input input-bordered mb-4"
            />

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img src={product.productImages} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td>{product.productName}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.paymentOption}</td>
                                <td>
                                    <button

                                        className="btn btn-sm btn-primary mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => productDelete(product._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;