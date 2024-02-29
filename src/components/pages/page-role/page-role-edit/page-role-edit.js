"use strict"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import environment from "../../../../environment";

import classes from "./page-role-edit.module.css";

const PageRoleEdit = (props) => {
    const navigate = useNavigate();
    
    const nameRole = useRef();

    const url = `${environment.api.url}${environment.api.role.newRole}`;


    const onNewUserHandler = async(event) => {
        event.preventDefault();
        let inputNameRole = nameRole.current.value;

        if(inputNameRole) {
           let payload = {
            name: inputNameRole
           }

           let res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
           })

           if(!res.ok) throw new Error("Call api unsuccess");

           let { status } = await res.json();
           if(status) {
            navigate("/roles");
           }
        }
    }


    return (
        <div className={classes['user-add-component']}>
            <div className="container">
                <form className="row" onSubmit={onNewUserHandler}>
                    <div className="form-group col-6">
                        <label htmlFor="fullName">Loại phân quyền</label>
                        <input ref={nameRole} type="text" className="form-control"/>
                    </div>
                    
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sửa phân quyền</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PageRoleEdit;