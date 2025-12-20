import React from 'react';
import useAuth from '../../../hooks/useAuth'; // তোমার auth hook
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router'; // useNavigate ঠিক করা
import Loading from '../../../Components/Loading';

const MyProfile = () => {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('লগআউট সফল হয়েছে!');
      navigate('/login');
    } catch (err) {
      toast.error('লগআউট করতে ব্যর্থ');
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-2xl text-red-400">লগইন করুন প্রথমে!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">
          My <span className="text-amber-400">Profile</span>
        </h1>

        <div className="bg-slate-900/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Photo */}
            <div className="avatar">
              <div className="w-48 rounded-full ring ring-amber-400 ring-offset-4 ring-offset-slate-950">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/0t0r4hZ/default-avatar.png'}
                  alt="User Avatar"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-bold text-amber-300">
                {user.displayName || user.email.split('@')[0]}
              </h2>
              <div className="space-y-4 text-gray-300">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role || 'User'}</p>
                <p><strong>Joined:</strong> {user.metadata?.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString('bn-BD')
                  : 'N/A'}</p>
                {/* যদি আরও info থাকে যেমন phone, address ইত্যাদি add করো */}
              </div>

              {/* Logout Button */}
              <div className="mt-8">
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-lg w-full md:w-auto px-10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Suspend Feedback Section (এখানে যোগ করা হয়েছে) */}
          {user.status === "suspended" && (
            <div className="mt-12 bg-red-900/50 p-6 rounded-2xl border border-red-500/50">
              <h3 className="text-xl font-bold text-red-400 mb-4">
                আপনার অ্যাকাউন্ট সাসপেন্ড করা হয়েছে
              </h3>
              <p className="text-gray-300 mb-2">
                <strong>Reason:</strong> {user.suspendReason || "No reason provided"}
              </p>
              <p className="text-gray-300">
                <strong>Feedback:</strong> {user.suspendFeedback || "No feedback provided"}
              </p>
            </div>
          )}
        </div>

        {/* Extra Info Section (optional) */}
        <div className="mt-12 bg-slate-900/80 rounded-3xl p-8 shadow-2xl border border-slate-700">
          <h3 className="text-2xl font-bold mb-6 text-amber-300">Additional Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p><strong>Account Status:</strong> {user.status || 'Active'}</p>
              <p><strong>Last Login:</strong> {user.metadata?.lastSignInTime 
                ? new Date(user.metadata.lastSignInTime).toLocaleString('bn-BD')
                : 'N/A'}</p>
            </div>
            <div>
              <p><strong>Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;