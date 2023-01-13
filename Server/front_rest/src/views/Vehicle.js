import React, {useState,  useEffect } from "react";
import {api} from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import axios from "axios";
import {
    Link
} from "react-router-dom";

async function createVehicle(credentials){
    try{
        return await axios.post(api.url + "/vehicle",credentials,{
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(({data}) => {
            return data;
        })
    }
    catch(err){
        return err.response.message
    }
}


function Vehicle({setToken}){
    const [errorMessage,setErrorMessage] = useState(null)
    const [message,setMessage] = useState(null)
    const [date_immatriculation,setDateImmatriculation] = useState(null)
    const [immatriculation,setImmatriculation] = useState(null)
    const [name_brand,setNameBrand] = useState(null)

    function handleDateImmatriculation(e){
        setDateImmatriculation(e.target.value);
    }
    function handleImmatriculation(e){
        setImmatriculation(e.target.value);
    }
    function handleNameBrand(e){
        setNameBrand(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await createVehicle({
            date_of_immatriculation: date_immatriculation,
            immatriculation: immatriculation,
            name_brand: name_brand
        })
        if(response){
            if(response.message === "Le véhicule a été créé"){
                setMessage("véhicule créé")
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
                <div id="containerDateImmat">
                    <InputField  label={"Date immatriculation"} name={"date"} type={"date"} placeholder={"Date immatriculation"}  idName={"inputField-dateImmatriculation"}   onChange={handleDateImmatriculation}/>
                </div>
                <div id="containerImmatriculation">
                    <InputField  label={"Immatriculation"} name={"Immatriculation"} type={"text"} placeholder={"Immatriculation"}  idName={"inputField-Immatriculation"}   onChange={handleImmatriculation}/>
                </div>
                <div id="containerImmatriculation">
                    <InputField  label={"Name brand"} name={"name_brand"} type={"text"} placeholder={"Name brand"}  idName={"inputField-nameBrand"}   onChange={handleNameBrand}/>
                </div>
                {errorMessage && <p className="lato" id="errorMessage">{errorMessage}</p>}
                <ButtonForm  content={"Création de véhicule"}/>
            </form>
        </div>
    )
}

export default Vehicle;