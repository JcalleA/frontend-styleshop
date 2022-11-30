import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Negocio from "../components/Negocios/Negocio/Negocio";
import FormRegistroNegocio from "../components/RegistroNegocio/FormRegistroNegocio";
import AuthContext from "../contexts/AuthContext";


const NegocioRoute = () => {


    const { auth } = useContext(AuthContext);

    if (auth) {

        const Token = auth.usuario.token
        const [negocios, setNegocios] = useState([])
        useEffect(() => {
            axios
                .get("https://backstyleshop.herokuapp.com/api/negocio/getnegocio", {
                    headers: {
                        'Authorization': `Bearer ${Token}`
                    }
                })
                .then((res) => {
                    const { data } = res;
                    if (data.mensaje === "No se encontro Negocio") {
                        setNegocios(null)
                    } else {
                        setNegocios(data.negocio)
                    }

                })
                .catch((error) => console.log(error))
        }, []);

        return (
            negocios ? (
                <div className="row">
                    <h1>Tus Negocios</h1>
                    {negocios.map((negocio) => {
                        return <Negocio key={negocio._id} id={negocio._id} correo={negocio.correo} nombre={negocio.nombre} imagenUrl={negocio.imagenUrl} ciudad={negocio.ciudad} telefono={negocio.telefono}></Negocio>
                    })}
                    <FormRegistroNegocio></FormRegistroNegocio>
                </div>
            ) : (
                <div >
                    <h1>No tienes negocio Registra Uno</h1>
                    <FormRegistroNegocio></FormRegistroNegocio>
                </div>
            )
        )
    }
};

export default NegocioRoute;