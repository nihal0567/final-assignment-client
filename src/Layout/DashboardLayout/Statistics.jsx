import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

const Statistics = () => {
    const { user, logOut } = useAuth();
    const orderData = [
        { name: 'Jan', orders: 12 },
        { name: 'Feb', orders: 19 },
        { name: 'Mar', orders: 15 },
        { name: 'Apr', orders: 22 },
        { name: 'May', orders: 18 },
        { name: 'Jun', orders: 25 },
    ];
    const handleLogout = () => {
        logOut().then(() => {
            // toast.success('Logged out successfully');
            window.location.href = '/login';
        });
    };
    return (
        <div>
            <div className="">
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="navbar bg-slate-900 text-white shadow-lg">
                            <div className="flex-1">
                                <Link to="/dashboard" className="btn btn-ghost text-xl font-bold text-amber-400">
                                    Dashboard
                                </Link>
                            </div>
                            <div className="flex-none gap-4">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL || 'https://i.ibb.co/0t0r4hZ/default-avatar.png'} alt="User" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52">
                                        <li><Link to="/dashboard/profile">Profile</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="p-6">
                            {/* Quick Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="stats shadow bg-slate-900">
                                    <div className="stat">
                                        <div className="stat-title text-gray-400">Total Orders</div>
                                        <div className="stat-value text-amber-400">1,234</div>
                                    </div>
                                </div>
                                <div className="stats shadow bg-slate-900">
                                    <div className="stat">
                                        <div className="stat-title text-gray-400">Pending Orders</div>
                                        <div className="stat-value text-warning">56</div>
                                    </div>
                                </div>
                                <div className="stats shadow bg-slate-900">
                                    <div className="stat">
                                        <div className="stat-title text-gray-400">Revenue</div>
                                        <div className="stat-value text-success">৳১২৩,৪৫৬</div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
                                    <h3 className="text-xl font-bold mb-4 text-amber-300">Monthly Orders</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={orderData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                            <XAxis dataKey="name" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                                            <Legend />
                                            <Bar dataKey="orders" fill="#fbbf24" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
                                    <h3 className="text-xl font-bold mb-4 text-amber-300">Revenue Trend</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={orderData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                            <XAxis dataKey="name" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                                            <Legend />
                                            <Bar dataKey="orders" fill="#10b981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Outlet for child routes */}
                            {/* <Outlet /> */}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-slate-900 text-white">
                            <li className="mb-8">
                                <h2 className="text-2xl font-bold text-amber-400">Dashboard Menu</h2>
                            </li>
                            <li><Link to="/dashboard">Overview</Link></li>
                            <li><Link to="/dashboard/my-orders">My Orders</Link></li>
                            <li><Link to="/dashboard/profile">Profile</Link></li>
                            <li><Link to="/dashboard/track-order">Track Order</Link></li>
                            {/* Admin/Manager specific links */}
                            {user?.role === 'Admin' && (
                                <>
                                    <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
                                    <li><Link to="/dashboard/all-products">All Products</Link></li>
                                    <li><Link to="/dashboard/all-orders">All Orders</Link></li>
                                </>
                            )}
                            {user?.role === 'Manager' && (
                                <>
                                <li><Link to="/dashboard/add-product">Add Products</Link></li>
                                    <li><Link to="/dashboard/manage-products">Manage Products</Link></li>
                                </>
                            )}
                            <li>
                                <button onClick={handleLogout} className="text-error">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;