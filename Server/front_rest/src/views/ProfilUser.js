import React, {useState,  useEffect } from "react";
import {api} from "../configApi.js";
import axios from "axios";
import {
    Link
} from "react-router-dom";



function ProfilUser({setToken}){
    const [firstName,setFirstName] = useState(localStorage.getItem("first_name"))
    const [lastName,setLastName] = useState(localStorage.getItem("last_name"))
    const [email,setEmail] = useState(localStorage.getItem("email"))

    
    return(
        <div id="mainContainerLogin">
            <h1>Profil utilisateur</h1>
            {firstName && <p>{firstName}</p>}
            {lastName && <p>{lastName}</p>}
            {email && <p>{email}</p>}

        </div>
    )
}

export default ProfilUser;