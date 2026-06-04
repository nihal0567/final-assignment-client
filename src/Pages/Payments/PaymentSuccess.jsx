import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  console.log(sessionId);
  
  useEffect(() => {
    if (sessionId) {
     
      axiosSecure.post(`/verify-payment?session_id=${sessionId}`)
        .then((res) => {
          console.log("payment post", res.data);
          
          if (res.data.success) {
            toast.success('Payment Success! Order has been Confirmed।');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('There is a Problem।');
        });
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-500 mb-4">Payment Success!</h1>
        <p className="text-xl mb-6">Your Order has been Confirmed !</p>
        <button
          onClick={() => navigate('/dashboard/my-orders')}
          className="btn btn-success px-8 py-4 text-lg"
        >
          My Orders 
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;