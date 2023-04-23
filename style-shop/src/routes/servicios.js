import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";


const Servicios = () => {

    const { auth } = useContext(AuthContext);

    if (auth) {
        
        const Token = auth.usuario.token
        const [servicios, setServicios] = useState([])
        useEffect(() => {
            

            axios
                .get("https://back-api-nfs4.onrender.com/api/users/getuser", {
                    headers: {
                        'Authorization': `Bearer ${Token}`
                    }
                })
                .then((res) => {
                    const { data } = res;
                    setServicios(data)
                })
                .catch((error) => console.log(error))
                .catch((res) => {
                    const { datos } = res;
                    setServicios(datos)
                })
        }, []);
        return (
            auth ? (
                <div>
                    <div className="card" style={{width: '18rem'}}>
                        <img className="card-img-top" src={servicios.imagenUrl} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">Welcome {servicios.nombre}</h5>
                            <h1> apellido {servicios.apellido}</h1>
                            <h1> correo {servicios.correo}</h1>
                            <h1> id {auth.usuario.id}</h1>

                            <button type="button" className="btn btn-primary">Primary</button>
                            <button onClick={() => Navigate("/logout")} > Sign Out</button>
                        </div>
                    </div>
                </div>

            ) : (
                <div>
                    <h1>Welcome Tienes Cuenta Logueate </h1>
                    <button onClick={() => Navigate("/login")}>Sign In</button>
                </div>
            )
        )
    } else {
        return (
            auth ? (
                <div>
                    <h1> Welcome {auth.usuario.id}</h1>
                    <button onClick={() => Navigate("/logout")} > Sign Out</button>
                </div>
            ) : (
                <Navigate to="/" />
            )
            
        )
    }
};

export default Servicios;