import React from "react";
import {
    Link
} from "react-router-dom";
function Home(){
    return(
        <div id="mainContainerHome">
            <Link to="/login">Se connecter</Link>
            <Link to="/register">S'inscrire</Link>
        </div>
    )
}

export default Home;