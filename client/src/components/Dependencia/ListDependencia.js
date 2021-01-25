import React, { Fragment, useEffect, useState } from "react";
import EditDependencia from "./EditDependencia";

const ListDependencia=()=>{
    return(
        <Fragment>
            <table class="table mt-5" text-center>
                <thead>
                    <tr>
                        <th>ID Dependencia</th>
                        <th>Nombre</th>
                        <th>Centro costo</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    
                </tbody>
        </table>
        </Fragment>
    )    
};

export default ListDependencia;