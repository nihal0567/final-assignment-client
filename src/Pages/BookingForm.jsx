import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router'; 
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
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const quantity = watch('quantity');

  // Fetch product by ID
  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        
        setProduct(res.data.result || res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        toast.error('প্রোডাক্ট লোড করতে সমস্যা হয়েছে');
        setProduct(null);
      });
  }, [id, axiosSecure]);

  // Auto-calculate total price
  useEffect(() => {
    if (quantity && product) {
      let orderPrice = quantity * product.productPrice;

      if (product.paymentOption === 'advance') {
        orderPrice = orderPrice / 2;
      }

      setTotalPrice(orderPrice);
    } else {
      setTotalPrice(0);
    }
  }, [quantity, product]);

  // Safe min/max quantity
  const minOrder =
    product && product.minOrderQuantity > 0 ? product.minOrderQuantity : 100;
  const maxOrder =
    product && product.productQuantity ? product.productQuantity : 999999;

  const onSubmit = async (data) => {
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
      paymentOption: product.paymentOption,
      paymentStatus: product.paymentOption === 'cod' ? 'cod' : 'pending',
      createdAt: new Date(),
    };

    // Swal confirm
    const confirmResult = await Swal.fire({
      title: 'do you want to confirm this order?',
      text: 'you can"t back this page after confirm this order',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'yes confirm',
      denyButtonText: 'No',
    });

    if (!confirmResult.isConfirmed) {
      Swal.fire('order has been cancelled', '', 'info');
      return;
    }

    try {
      // 1. Save order in DB first
      const orderRes = await axiosSecure.post('/orders', orderData);

      if (!orderRes.data.insertedId) {
        throw new Error('অর্ডার সেভ করতে ব্যর্থ');
      }

      const insertedId = orderRes.data.insertedId;

      // 2. COD case
      if (product.paymentOption === 'cod') {
        toast.success('অর্ডার সফলভাবে প্লেস হয়েছে (ক্যাশ অন ডেলিভারি)');
        Swal.fire('সফল!', 'আপনার অর্ডার কনফার্ম হয়েছে', 'success');
        navigate('/dashboard/my-orders'); // তোমার My Orders পেজ
        return;
      }

      // 3. Advance/Stripe payment case
      const sessionRes = await axiosSecure.post('/create-checkout-session', {
        ...orderData,
        orderId: insertedId,
      });

      if (sessionRes.data.url) {
        toast.info('পেমেন্ট পেজে রিডাইরেক্ট করা হচ্ছে...');
        window.location.href = sessionRes.data.url; 
      } else {
        throw new Error('পেমেন্ট সেশন তৈরি করতে ব্যর্থ');
      }

      // Swal success (পেমেন্ট complete হলে success page থেকে আসবে)
      Swal.fire('সফল!', 'অর্ডার কনফার্ম হয়েছে', 'success');
    } catch (err) {
      console.error('Order submission error:', err);
      toast.error('অর্ডার প্লেস করতে সমস্যা হয়েছে: ' + (err.message || ''));
    }
  };

  if (loading) return <Loading />;
  if (!product)
    return (
      <p className="text-center text-white mt-20">প্রোডাক্টের বিস্তারিত লোড হচ্ছে...</p>
    );

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
                <p className="text-xl font-bold text-amber-300">
                  {product.productName}
                </p>
                {product.productImages?.length > 0 && (
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
                {...register('firstName', { required: 'প্রথম নাম দিন' })}
                placeholder="First Name"
                className="input input-bordered w-full bg-slate-800/60"
              />
              <input
                {...register('lastName', { required: 'শেষ নাম দিন' })}
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
                    required: 'পরিমাণ দিন',
                    min: {
                      value: minOrder,
                      message: `ন্যূনতম অর্ডার ${minOrder}`,
                    },
                    max: {
                      value: maxOrder,
                      message: `সর্বোচ্চ ${maxOrder} পাওয়া যাবে`,
                    },
                  })}
                  className="input input-bordered w-full bg-slate-800/60"
                />
                {errors.quantity && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
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
                {...register('contactNumber', { required: 'মোবাইল নম্বর দিন' })}
                placeholder="Contact Number"
                className="input input-bordered w-full bg-slate-800/60"
              />
              <textarea
                {...register('deliveryAddress', { required: 'ডেলিভারি ঠিকানা দিন' })}
                placeholder="Delivery Address"
                rows="3"
                className="textarea textarea-bordered w-full bg-slate-800/60"
              />
            </div>

            {/* Notes */}
            <textarea
              {...register('notes')}
              placeholder="additional notes"
              rows="4"
              className="textarea textarea-bordered w-full bg-slate-800/60"
            />

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="btn btn-warning flex-1 w-full text-lg font-bold"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;