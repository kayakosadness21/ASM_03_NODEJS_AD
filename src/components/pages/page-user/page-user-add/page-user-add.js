"use strict"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import environment from "../../../../environment";

import classes from "./page-user-add.module.css";

const PageUserAdd = (props) => {
    const navigate = useNavigate();
    
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const phone = useRef();
    const address = useRef();

    const url = `${environment.api.url}${environment.api.user.newUser}`;


    const onNewUserHandler = async(event) => {
        event.preventDefault();
        let inputName = fullName.current.value;
        let inputEmail = email.current.value;
        let inputPassword = password.current.value;
        let inputPhone = phone.current.value;
        let inputAddress = address.current.value;

        if((inputName && inputEmail) && inputPassword) {
           let payload = {
            fullName: inputName,
            email: inputEmail,
            password: inputPassword,
            phoneNumber: inputPhone,
            address: inputAddress
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
                        <label htmlFor="password">Mật khẩu</label>
                        <input ref={password} type="password" className="form-control" />
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input ref={phone} type="phone" className="form-control" />
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="address">Địa chỉ</label>
                        <input ref={address} type="text" className="form-control" />
                    </div>
                    
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Tạo tài khoản</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PageUserAdd;