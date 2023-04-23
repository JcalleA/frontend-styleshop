import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const EliminarNegocio= (email)=>{

    
        
        axios
            .delete("https://back-api-nfs4.onrender.com/api/negocio/remove/"+email)
            .then((res) => {
                const { data } = res;
                Swal.fire(data.mensaje+email)
            })
            .catch((error) => {
                Swal.fire(error)
            });
    }


export default  EliminarNegocio;
