"use strict"
import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import environment from "../../../../environment";

import classes from "./page-user-edit.module.css";

const PageUserEdit = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    
    const fullName = useRef();
    const email = useRef();
    const phone = useRef();
    const address = useRef();
    const userRole = useRef();

    const url = `${environment.api.url}${environment.api.user.updateUser}`;
    const urlUser = `${environment.api.url}${environment.api.user.origin}`;
    const urlRoles = `${environment.api.url}${environment.api.role.origin}`;

    const getAllRole = async() => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch(urlRoles, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, roles} = await res.json();
            if(status) {
                resolve(roles);
            }
        })
    }

    const getUserById = async(id) => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch(`${urlUser}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, user} = await res.json();
            if(status) {
                resolve(user);
            }
        })
    }

    useEffect(() => {
        let { id } = params;

        let callApi = async () => {
            let data = await Promise.all([getAllRole(), getUserById(id)]);
            let [roles, user] = data;

            if(user && roles) {
                setRoles(roles);
                setUser(user);
                fullName.current.value = user.fullName;
                email.current.value = user.email;
                phone.current.value = user.phoneNumber;
                address.current.value = user.address;
            }
        }

        callApi();
    }, [])


    const onNewUserHandler = async(event) => {
        event.preventDefault();
        let inputName = fullName.current.value;
        let inputEmail = email.current.value;
        let inputPhone = phone.current.value;
        let inputAddress = address.current.value;
        let selectRole = userRole.current.value;

        if((inputName && inputEmail)) {
           let payload = {
            id: user._id,
            fullName: inputName,
            email: inputEmail,
            phoneNumber: inputPhone,
            address: inputAddress,
            role: selectRole
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
            navigate("/users");
           }
        }
    }


    return (
        <div className={classes['user-add-component']}>
            <div className="container">
                <form className="row" onSubmit={onNewUserHandler}>
                    <div className="form-group col-6">
                        <label htmlFor="fullName">Họ và tên</label>
                        <input ref={fullName} type="text" className="form-control"/>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="email">E-mail</label>
                        <input ref={email} type="email" className="form-control" />
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input ref={phone} type="phone" className="form-control" />
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="address">Địa chỉ</label>
                        <input ref={address} type="text" className="form-control" />
                    </div>

                    <div className="form-group col-6">
                        <label for="exampleFormControlSelect1">Phân quyền</label>
                        <select ref={userRole} className="form-control" id="exampleFormControlSelect1">
                            {roles.length > 0 && roles.map((role) => {
                                return (
                                    <option selected={user?.role == role._id} key={role._is} value={role._id}>{role.title}</option>
                                )
                            })}
                        </select>
                    </div>
                    
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Tạo tài khoản</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PageUserEdit;