import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const EliminarNegocio= (id)=>{

    
        axios
            .delete("https://backstyleshop.herokuapp.com/api/negocio/remove/"+id)
            .then((res) => {
                const { data } = res;
                Swal.fire(data.mensaje)
            })
            .catch((error) => {
                Swal.fire(error)
            });
    }


export default  EliminarNegocio;