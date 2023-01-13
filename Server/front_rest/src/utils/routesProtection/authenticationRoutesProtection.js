import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutesAuthentification = ({token,children}) => {
    console.log("token : ",token)
    if(!token){
        <Navigate to="/login" replace />
    }
    if(token){
        <Navigate to="/profil" replace/>
    }
    return children ? children: <Outlet/>;
}

export default ProtectedRoutesAuthentification;