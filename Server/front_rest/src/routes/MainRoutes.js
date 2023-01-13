import Home from "../views/Home.js"
import LoginPage from "../views/authentication/LoginPage.js"
import RegisterPage from "../views/authentication/RegisterPage.js";
import ProfilUser from "../views/ProfilUser.js";
import ProtectedRoutesAuthentication from "../utils/routesProtection/authenticationRoutesProtection";
import ProtectedRoutesProfil from "../utils/routesProtection/profilRoutesProtection";

import {setToken, getToken,removeToken} from "../utils/localStorage/useToken.js";

let token = getToken();

const MainRoutes = {
    path: "",
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "login",
            element: <ProtectedRoutesAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <LoginPage setToken={setToken}/>
                }
            ]
        },
        {
            path: "register",
            element: <ProtectedRoutesAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <RegisterPage  setToken={setToken}/>
                }
            ]
        },
        {
            path: "profil",
            element: <ProtectedRoutesProfil token={getToken()}/>,
            children: [
                {
                    path:"",
                    element: <ProfilUser token={getToken()}/>
                }
            ]
        }
    ]
}

export default MainRoutes;