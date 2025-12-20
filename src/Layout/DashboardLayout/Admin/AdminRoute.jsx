import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Components/Loading';
import useRole from '../../../hooks/useRole';
import ForbiddenAccess from '../../../Components/Shared/ForbiddenAccess';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const { role, roleLoading} = useRole()
    if (loading || roleLoading) {
        <Loading/>
    }
    if (role !== 'admin') {
        return <ForbiddenAccess />
    }
    return children
};

export default AdminRoute;