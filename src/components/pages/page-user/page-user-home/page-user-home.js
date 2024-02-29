import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import environment from "../../../../environment";
import classes from "./page-user-home.module.css";

const PageUserHome = (props) => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    let url = `${environment.api.url}${environment.api.user.origin}`;
    let urlDestroy = `${environment.api.url}${environment.api.user.destroyUser}`;

    useEffect(() => {
        let callApi = async () => {
            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, users} = await res.json();
            if(status) {
                setUsers(users);
            }
        }

        callApi();
    }, [reload])

    const onNewUserHandler = (event) => {
        navigate("/users-add");
    }

    const onDeleteUserHandler = async(event) => {
        let { id } = event.target.dataset;

        if(window.confirm("Bạn có chắc xoá tài khoản này!") && id) {
            let res = await fetch(urlDestroy, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, } = await res.json();
            
            if(status) {
                setReload(!reload);
            }
        }
    }

    return (
        <div className={classes["user-dashboard"]}>
            <div className="container">
                <div className="tab-navigater">
                    <button className="btn btn-primary" onClick={onNewUserHandler}>Tạo mới</button>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <th scope="row">{index}</th>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            onClick={onDeleteUserHandler}
                                            className="btn btn-danger mr-2"
                                            data-id={user._id}>Xoá</button>
                                        <button className="btn btn-warning">Sửa</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default PageUserHome;