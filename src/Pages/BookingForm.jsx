import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../Components/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const BookingForm = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
//  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const quantity = watch('quantity');

  // Fetch product by ID
  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => setProduct(res.data.result || res.data))
      .catch(err => {
        console.error('Failed to fetch product:', err);
        setProduct(null);
      });
  }, [id, axiosSecure]);

  // Auto-calculate total price based on quantity and paymentOption
  useEffect(() => {
    if (quantity && product) {
      const pricePerUnit = product.productPrice;
      let orderPrice = quantity * pricePerUnit;
      if (product.paymentOption === 'advance') {
        orderPrice = orderPrice / 2; // half payment if advance
      }
      setTotalPrice(orderPrice);
    } else {
      setTotalPrice(0);
    }
  }, [quantity, product]);

  // Safe min/max quantity
  const minOrder = product && product.minOrderQuantity > 0 ? product.minOrderQuantity : 1;
  const maxOrder = product && product.productQuantity ? product.productQuantity : 999999;

  const onSubmit = (data) => {
    const orderData = {
      productId: product._id,
      productTitle: product.productName,
      unitPrice: product.productPrice,
      orderQuantity: Number(data.quantity),
      orderPrice: totalPrice,
      email: user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
      status: 'pending',
      paymentOption: product.paymentOption
    };
    console.log(orderData);
    Swal.fire({
      title: "Do you want to save the Confirm the order?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No. I do not want`
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/orders', orderData)
          .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              toast('Order placed successfully!');
          //    navigate('/orders'); // redirect to order page
            } else {
              toast('Failed to place order. Please try again.');
            }
          })
          .catch(err => {
            toast.error('Order submission error:', err);
          });
        Swal.fire("Confirmed!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Order not done yet", "", "info");
      }
    });


  };

  if (loading) return <Loading />;
  if (!product) return <p className="text-center text-white mt-20">Loading product details...</p>;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          Book Your <span className="text-amber-400">Order</span>
        </h1>

        <div className="bg-slate-900/70 rounded-3xl p-8 md:p-12">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Product Info */}
            <div className="grid md:grid-cols-3 gap-6 border-b pb-6 border-white/10">
              <div>
                <label className="text-sm text-gray-400">Product</label>
                <p className="text-xl font-bold text-amber-300">{product.productName}</p>
                {product.productImages && product.productImages.length > 0 && (
                  <img
                    src={product.productImages[0]}
                    alt={product.productName}
                    className="w-32 h-32 object-cover rounded mt-2"
                  />
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400">Payment Info</label>
                <p className="text-xl font-bold text-cyan-400">
                  {product.paymentOption === 'advance'
                    ? `${(product.productPrice / 2).toFixed(2)}`
                    : `${product.productPrice}`}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full bg-slate-800/60"
                />
              </div>
            </div>

            {/* Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                {...register('firstName', { required: 'First name required' })}
                placeholder="First Name"
                className="input input-bordered w-full bg-slate-800/60"
              />
              <input
                {...register('lastName', { required: 'Last name required' })}
                placeholder="Last Name"
                className="input input-bordered w-full bg-slate-800/60"
              />
            </div>

            {/* Quantity & Total */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400">
                  Quantity (Min {minOrder}, Max {maxOrder})
                </label>
                <input
                  type="number"
                  {...register('quantity', {
                    required: 'Quantity required',
                    min: { value: minOrder, message: `Minimum order is ${minOrder}` },
                    max: { value: maxOrder, message: `Only ${maxOrder} available` }
                  })}
                  className="input input-bordered w-full bg-slate-800/60"
                />
                {errors.quantity && <p className="text-red-400 text-sm mt-1">{errors.quantity.message}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-400">Total Price</label>
                <input
                  readOnly
                  value={`৳ ${totalPrice.toFixed(2)}`}
                  className="input input-bordered w-full bg-slate-800/80 text-cyan-400 font-bold"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                {...register('contactNumber', { required: 'Contact number required' })}
                placeholder="Contact Number"
                className="input input-bordered w-full bg-slate-800/60"
              />
              <textarea
                {...register('deliveryAddress', { required: 'Address required' })}
                placeholder="Delivery Address"
                rows="3"
                className="textarea textarea-bordered w-full bg-slate-800/60"
              />
            </div>

            {/* Notes */}
            <textarea
              {...register('notes')}
              placeholder="Additional notes (optional)"
              rows="4"
              className="textarea textarea-bordered w-full bg-slate-800/60"
            />

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="btn btn-warning flex-1 w-full text-lg font-bold">
                Confirm Booking
              </button>
              {/* <Link to="/" className="btn btn-outline flex-1 text-lg font-bold">
                Cancel
              </Link> */}
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default BookingForm;