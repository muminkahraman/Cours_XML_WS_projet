import React, {useState} from "react";
import {api} from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import axios from "axios";
import {
    Link
} from "react-router-dom";

async function registerUser(credentials){
    try{
        return await axios.post(api.url + "/register",credentials,{
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
        return err.response.message
    }
}

function RegisterPage({setToken}){
    const [errorMessage,setErrorMessage] = useState(null)
    const [email,setUserEmail] = useState(null)
    const [first_name,setUserFirstName] = useState(null)
    const [last_name,setUserLastName] = useState(null)
    const [password,setUserPassword] = useState(null)
    const [dateOfBirth,setDateOfBirth] = useState(null)

    function handleEmailChange(e){
        setUserEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setUserPassword(e.target.value);
    }
    function handleFirstNameChange(e){
        setUserFirstName(e.target.value);
    }
    function handleLastNameChange(e){
        setUserLastName(e.target.value);
    }
    function handleDateOfBirthChange(e){
        setDateOfBirth(e.target.value);
    }
    const handleSubmit = async e => {
        e.preventDefault();

        let response = await registerUser({
            first_name: first_name,
            last_name: last_name,
            password: password,
            date_of_birth: dateOfBirth,
            mail_address: email
        })

        if(response.message === "Inscription valide"){
            setToken(response.token);
            window.location.reload();
        }
        else{
            setErrorMessage(response.message)
        }
    }

    return (
        <div id="mainContainerRegister">
            <form onSubmit={handleSubmit}>
                <div id="containerFirstName">
                    <InputField  label={"Prénom"} name={"firstname"} type={"text"} placeholder={"Prénom"}  idName={"inputField-first-name"}   onChange={handleFirstNameChange}/>
                </div>
                <div id="containerLastName">
                    <InputField  label={"Nom"} name={"lastname"} type={"text"} placeholder={"Nom"}  idName={"inputField-last-name"}  onChange={handleLastNameChange}/>
                </div>
                <div id="containerEmail">
                    <InputField  label={"Adresse mail"} name={"email"} type={"email"} placeholder={"Adresse mail"}  idName={"inputField-email"}  onChange={handleEmailChange}/>
                </div>
                <div id="containerPassword">
                    <InputField label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Mot de passe"}  idName={"inputField-password"}  onChange={handlePasswordChange}/>
                </div>
                <div id="containerDateOfBirth">
                    <input type="date" id="start" name="trip-start" value="2023-01-13" onChange={handleDateOfBirthChange}/>            
                </div>
                <ButtonForm  content={"S'inscrire"}/>
            </form>
        </div>
    )
}

export default RegisterPage;