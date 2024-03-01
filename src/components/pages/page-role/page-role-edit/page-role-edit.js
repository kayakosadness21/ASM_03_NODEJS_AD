import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import environment from "../../../../environment";

import classes from "./page-role-edit.module.css";

const PageRoleEdit = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const [role, setRole]= useState(null);
    const [roleValue, setRoleValue] = useState('');
    
    const nameRole = useRef();
    let url = `${environment.api.url}${environment.api.role.origin}`;
    let urlUpdate = `${environment.api.url}${environment.api.role.updateRole}`;

    useEffect(() => {
        let { id } = params;
        url = `${url}/${id}`;

        let callApi = async() => {
               let res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
               })

               if(!res.ok) throw new Error("Call api unsuccess");

               let { status, role } = await res.json();
               if(status) {
                setRoleValue(role.title)
                setRole(role);
               }
        }

        callApi();

    }, [])

    const onChangeRoleNameHandler = (event) => {
        setRoleValue(event.target.value);
    }


    const onUpdateRoleHandler = async(event) => {
        event.preventDefault();
        let inputNameRole = nameRole.current.value;

        if(inputNameRole) {
           let payload = {
            id: role._id,
            name: inputNameRole
           }

           let res = await fetch(urlUpdate, {
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
                <form className="row" onSubmit={onUpdateRoleHandler}>
                    <div className="form-group col-6">
                        <label htmlFor="fullName">Loại phân quyền</label>
                        <input
                            onChange={onChangeRoleNameHandler}
                            ref={nameRole}
                            value={roleValue}
                            type="text"
                            className="form-control"/>
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