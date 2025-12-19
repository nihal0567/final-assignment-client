import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      console.log('Verifying session:', sessionId);
      axiosSecure
        .get(`/verify-payment/${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            toast.success('পেমেন্ট সফল! অর্ডার কনফার্ম হয়েছে।');
            navigate('/dashboard/my-orders'); // অথবা তোমার পছন্দের পেজ
          } else {
            toast.error('পেমেন্ট verify হতে ব্যর্থ।');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('কোনো সমস্যা হয়েছে।');
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-500 mb-4">পেমেন্ট সফল!</h1>
        <p className="text-xl mb-6">আপনার অর্ডার কনফার্ম হয়েছে।</p>
        <button
          onClick={() => navigate('/dashboard/my-orders')}
          className="btn btn-success px-8 py-4 text-lg"
        >
          My Orders দেখুন
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;