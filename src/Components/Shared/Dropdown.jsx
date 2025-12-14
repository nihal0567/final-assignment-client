import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import { FaUserTie } from 'react-icons/fa';

const Dropdown = () => {
    const  {user, logOut} = useAuth()
        const userLogOut = () => {
        logOut()
            .then()
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 rounded-full p-2">
                        {
                         user ?  <img className='h-8 w-8 rounded-full' src={user?.photoURL} alt="" /> : <FaUserTie size={24} />
                        } 
                        </div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><a onClick={userLogOut}>Log Out</a></li>
                        </ul>
                    </div>
    );
};

export default Dropdown;