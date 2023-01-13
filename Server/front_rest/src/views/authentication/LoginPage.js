import React, {useState,  useEffect } from "react";
import {api} from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import axios from "axios";
import {
    Link
} from "react-router-dom";

async function loginUser(credentials){
    try{
        return await axios.post(api.url + "/login",credentials,{
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(({data}) => {
            console.log("token : ",data.token)
            localStorage.setItem("first_name",data.first_name)
            localStorage.setItem("last_name",data.last_name)
            localStorage.setItem("email",data.mail_address)
            localStorage.setItem("token",data.token)
            return data;
        })
    }
    catch(err){
        return err
    }
}

function LoginPage({setToken}){
    const [errorMessage,setErrorMessage] = useState(null)
    const [email,setUserEmail] = useState(null)
    const [password,setUserPassword] = useState(null)

    function handleEmailChange(e){
        setUserEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setUserPassword(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await loginUser({
            email: email,
            password: password
        })
        if(response){
            if(response.message === "Vos identifiants sont corrects"){
                setToken(response.token);
                window.location.reload();
            }
            else{
                setErrorMessage(response.message)
            }
        }
        else{
            setErrorMessage("Erreur interne");
        }
    }

    return(
        <div id="mainContainerLogin">
            <h1>Formulaire de connexion</h1>
            <form onSubmit={handleSubmit}>
                <div id="containerEmail">
                    <InputField  label={"Email"} name={"email"} type={"email"} placeholder={"Email"}  idName={"inputField-email"}   onChange={handleEmailChange}/>
                </div>
                <div id="containerPassword">
                    <InputField  label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Password"}  idName={"inputField-password"}   onChange={handlePasswordChange}/>
                </div>
                {errorMessage && <p className="lato" id="errorMessage">{errorMessage}</p>}
                <ButtonForm  content={"Se connecter"}/>
            </form>
        </div>
    )
}

export default LoginPage;