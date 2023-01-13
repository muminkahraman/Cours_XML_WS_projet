import { Navigate, Outlet } from "react-router-dom";
const profilRoutesProtection = ({token,children}) => {
    console.log("token : ",token)
    if(!token){
        <Navigate to="/login" replace />
    }
    return children ? children: <Outlet/>;
}

export default profilRoutesProtection;